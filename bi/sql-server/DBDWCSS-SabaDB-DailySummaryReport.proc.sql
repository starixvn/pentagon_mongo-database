USE	SabaDB;
IF	OBJECT_ID('dbo.DailySummaryReport') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.DailySummaryReport AS';
END;
GO
ALTER PROCEDURE	dbo.DailySummaryReport
					@ReportDate		DATETIME		= NULL
WITH ENCRYPTION
AS
/*
	Creator:	20201008@Billy
	Task:		Compare Daily Summary result between OW and SB then send result via Notification Channel - [Gitlab: #000]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20201008@Billy:	Initial - [Gitlab: #000]

	Developer's Notes:
		- @ReportDate:				[optional]		- The date of data that will be compared. The time is in UTC timezone.
						<DEFAULT>	NULL			- Yesterday

*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@VendorId		INT 		= 42
		,	@_ReportDate	DATETIME	= ISNULL(@ReportDate, CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE))
		;

	IF	NOT (DATEDIFF(DAY, @_ReportDate, GETUTCDATE()) BETWEEN 1 AND 7)
		RETURN;

	DECLARE	@OW_Query		NVARCHAR(MAX)
		,	@OW_Param		NVARCHAR(MAX)
		,	@DS_Query		NVARCHAR(MAX)
		;

	DECLARE	@SC				INT
		,	@GameId			INT
		,	@GameType		NVARCHAR(128)
		,	@GameTypeId		INT
		,	@Message		NVARCHAR(MAX)
		,	@Title			NVARCHAR(512)
		;

	DECLARE	@Tmp_DailySummary AS TABLE (
				SC				TINYINT
			,	gameTypeId		INT
			,	gameId			INT
			,	gameType		NVARCHAR(128)
			,	currency		VARCHAR(10)
			,	phienCount		INT
			,	betCount		INT
			,	stake			DECIMAL(19,4)
			,	winLost			DECIMAL(19,4)
			,	payOut			DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency)
			);

	CREATE TABLE	#OW_DailySummary (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#DS_DailySummary (
						SC				TINYINT
					,	gameId			INT
					,	gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency)
					);

	-- OW Query --
	BEGIN;
		SELECT	@OW_Query = N'';
		SELECT	@OW_Query += N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	[gameTypeId]	= b.gameId
	,	[gameType]		= g.typenamee
	,	[currency]		= b.CurrencyName
	,	[phienCount]	= COUNT(DISTINCT b.GameId3rd)
	,	[betCount]		= COUNT(1)
	,	[stake]			= SUM(b.stake)
	,	[payOut]		= SUM(b.winlost)
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
WHERE	b.vendorID = @VendorId
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID NOT IN (101, 102, 0) -- Reject, Void, running
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName
OPTION (RECOMPILE);
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_DailySummary (gameTypeId, gameType, currency, phienCount, betCount, stake, payOut)
		EXECUTE	DB061KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @_ReportDate;

		RAISERROR('', 0, 0) WITH NOWAIT;
	END;

	SELECT	@DS_Query = N'';
	SELECT	@DS_Query += N'\
SELECT	0 AS SC
	,	cfg.owGameTypeId AS gameTypeId
	,	cfg.gameId AS gameId
	,	cfg.`name.en` AS gameType
	,	IFNULL(ds.currency, "null") AS currency
	,	ds.tickets AS betCount
	,	ds.stake AS stake
	,	ds.payOut AS payOut
FROM		summary.daily_summaries AS ds
INNER JOIN	summary.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	ds.time >= ''' + CONVERT(NVARCHAR(MAX), @_ReportDate, 127) + N'''
	AND	ds.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_ReportDate), 127) + N'''
';

	BEGIN;
		-- L1
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L1_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.SC = 1
					AND	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(SC,     gameTypeId,     gameId,     gameType,     currency,     betCount,     stake,     payOut)
				VALUES	( 1, tmp.gameTypeId, tmp.gameId, tmp.gameType, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L2
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L2_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.SC = 2
					AND	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(SC,     gameTypeId,     gameId,     gameType,     currency,     betCount,     stake,     payOut)
				VALUES	( 2, tmp.gameTypeId, tmp.gameId, tmp.gameType, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L3
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L3_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.SC = 3
					AND	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(SC,     gameTypeId,     gameId,     gameType,     currency,     betCount,     stake,     payOut)
				VALUES	( 3, tmp.gameTypeId, tmp.gameId, tmp.gameType, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;
	END;

	DELETE	@Tmp_DailySummary;
	INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, betCount, stake, winLost)
	SELECT	[SC]			= ISNULL(sb.SC, 0)
		,	[gameTypeId]	= ISNULL(ow.gameTypeId, sb.gameTypeId)
		,	[gameId]		= ISNULL(sb.gameId, 0)
		,	[gameType]		= ISNULL(ow.gameType, sb.gameType)
		,	[currency]		= ISNULL(ow.currency, sb.currency)
		,	[betCount]		= ISNULL(ow.betCount, 0) - ISNULL(sb.betCount, 0)
		,	[stake]			= ISNULL(ow.stake, 0) -ISNULL(sb.stake, 0)
		,	[winLost]		= ISNULL(ow.stake - ow.payOut, 0) - ISNULL(sb.stake - sb.payOut, 0)
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#DS_DailySummary AS sb
				ON	ow.gameTypeId = sb.gameTypeId
				AND	ow.currency = sb.currency
	WHERE	COALESCE(ow.currency, sb.currency) <> 'UUS'
		AND	(	ISNULL(ow.betCount, 0) <> ISNULL(sb.betCount, 0)
			OR	ISNULL(ow.stake, 0) <> ISNULL(sb.stake, 0)
			OR	ISNULL(ow.payOut, 0) <> ISNULL(sb.payOut, 0)
			);

	IF	EXISTS (SELECT 1 FROM @Tmp_DailySummary)
	BEGIN;
		WHILE	EXISTS (SELECT 1 FROM @Tmp_DailySummary)
		BEGIN;
			SELECT	TOP(1)
					@SC			= SC
				,	@GameId		= gameId
				,	@GameType	= gameType
				,	@GameTypeId	= gameTypeId
			FROM	@Tmp_DailySummary
			ORDER BY SC, gameId;

			SELECT	@Title		= N'MISMATCH] [Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
				,	@Message	= N'[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' (' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N')] ' + @GameType + N': (BC|TO|WL)' + msg.str
			FROM	(
				SELECT	N'
[' + currency + N']'
+ N' ' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(betCount AS MONEY), 1), '.00', '')
+ N'|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(stake AS MONEY), 1), '.00', '')
+ N'|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(winLost AS MONEY), 1), '.00', '')
				FROM	@Tmp_DailySummary
				WHERE	SC = @SC
					AND	gameId = @GameId
				ORDER BY currency
				FOR XML PATH ('')
				,	TYPE
			) AS xmsg(xml)
			CROSS APPLY	(
				SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
			) AS msg(str);

			EXECUTE	DBNOTI.NotificationDB.dbo.Letstalk_SendMessage
						@To			= N'DBNotification'
					,	@Title		= @Title
					,	@Msg		= @Message
					;

			SELECT	@Message = N'\\\[MISMATCH\] \\\[Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]  
\\\[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' \(' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N'\)\] ' + @GameType + N': \(BC\|TO\|WL\)'
							 + msg.str
			FROM	(
				SELECT	N'  
\\\[' + currency + N'\]'
+ N' ' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(betCount AS MONEY), 1), '.00', '')
+ N'\|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(stake AS MONEY), 1), '.00', '')
+ N'\|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(winLost AS MONEY), 1), '.00', '')
				FROM	@Tmp_DailySummary
				WHERE	SC = @SC
					AND	gameId = @GameId
				ORDER BY currency
				FOR XML PATH ('')
				,	TYPE
			) AS xmsg(xml)
			CROSS APPLY	(
				SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
			) AS msg(str);

			EXECUTE	DBNOTI.NotificationDB.dbo.Skype_SendMessage
						@To			= N'T-SCNOTI'
					,	@Msg		= @Message
					;

			DELETE	@Tmp_DailySummary
			WHERE	SC = @SC
				AND	gameId = @GameId;
		END;
	END;
	ELSE
	BEGIN;
		SELECT	@Title		= N'OK] [Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
			,	@Message	= msg.str
		FROM	(
			SELECT	N'
SC' + CONVERT(NVARCHAR(MAX), sb.SC) + N':
    - BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'
    - TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake AS MONEY)), 1) + N'
    - WL: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake - sb.payOut AS MONEY)), 1) + N'
'
			FROM	#DS_DailySummary AS sb
			WHERE	currency <> 'UUS'
			GROUP BY sb.SC
			ORDER BY sb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);

		EXECUTE	DBNOTI.NotificationDB.dbo.Letstalk_SendMessage
					@To			= N'DBNotification'
				,	@Title		= @Title
				,	@Msg		= @Message
				;

		SELECT	@Message	= N'\\\[OK\] \\\[Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]' + msg.str
		FROM	(
			SELECT	N'  
SC' + CONVERT(NVARCHAR(MAX), sb.SC) + N':  
    \- BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'  
    \- TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake AS MONEY)), 1) + N'  
    \- WL: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake - sb.payOut AS MONEY)), 1) + N'  
  '
			FROM	#DS_DailySummary AS sb
			WHERE	currency <> 'UUS'
			GROUP BY sb.SC
			ORDER BY sb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);

		EXECUTE	DBNOTI.NotificationDB.dbo.Skype_SendMessage
					@To			= N'T-SCNOTI'
				,	@Msg		= @Message
				;
	END;

	--SELECT	[OW =>] = ''
	--	,	ow.*
	--	,	[||] = '||'
	--	,	[Atv =>] = ''
	--	,	atv.*
	--	,	[||] = '||'
	--	,	[bet]		= CASE	WHEN ow.betCount = atv.betCount THEN '   OK   '
	--							ELSE '---NG---' END
	--	,	[stake]		= CASE	WHEN ow.stake = atv.stake THEN '   OK   '
	--							ELSE '---NG---' END
	--	,	[payOut]	= CASE	WHEN ow.payOut = atv.payOut THEN '   OK   '
	--							ELSE '---NG---' END
	--FROM			#OW_DailySummary AS ow
	--FULL OUTER JOIN	#DS_DailySummary AS atv
	--			ON	ow.gameTypeId = atv.gameTypeId
	--			AND	ow.currency = atv.currency
	--WHERE	COALESCE(ow.currency, atv.currency) <> 'UUS'
	--ORDER BY CASE WHEN COALESCE(ow.currency, atv.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, atv.gameTypeId, ow.currency, atv.currency;
END;
GO
EXECUTE	dbo.DailySummaryReport;
GO
