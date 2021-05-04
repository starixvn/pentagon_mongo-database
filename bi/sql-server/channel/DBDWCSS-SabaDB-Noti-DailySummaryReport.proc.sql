USE	SabaDB;
IF	OBJECT_ID('Noti.DailySummaryReport') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE Noti.DailySummaryReport AS';
END;
GO
ALTER PROCEDURE	Noti.DailySummaryReport
					@ReportDate		DATETIME		= NULL
				,	@isTest			BIT				= 0
WITH ENCRYPTION
AS
/*
	Creator:	20201008@Billy
	Task:		Compare Daily Summary result between OW and SB then send result via Notification Channel - [Gitlab: #000]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20201008@Billy:	Initial - [Gitlab: #058]
		- 20210218@Billy:	Report by currency for SC3 - [Gitlab: #058]
		- 20210423@Billy:	Update message format - [Gitlab: #060]

	Developer's Notes:
		- @ReportDate:				[optional]		- The date of data that will be compared. The time is in UTC timezone.
						<DEFAULT>	NULL			- Yesterday

*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@VendorId		INT 			= 42
		,	@_ReportDate	DATETIME		= ISNULL(@ReportDate, CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE))
		,	@Letstalk		NVARCHAR(128)	= CASE @isTest WHEN 1 THEN N'' ELSE N'DBNotification' END
		,	@Telegram		NVARCHAR(128)	= CASE @isTest WHEN 1 THEN N'T-BILLY' ELSE N'T-SCNOTI' END
		,	@Status			NVARCHAR(128)	= N'OK'
		;

	IF	NOT (DATEDIFF(DAY, @_ReportDate, GETUTCDATE()) BETWEEN 1 AND 7)
		RETURN;

	DECLARE	@OW_Query		NVARCHAR(MAX)
		,	@OW_Param		NVARCHAR(MAX)
		,	@DS_Query		NVARCHAR(MAX)
		;

	DECLARE	@SC				INT
		,	@isCash			TINYINT
		,	@GameId			INT
		,	@GameType		NVARCHAR(128)
		,	@GameTypeId		INT
		,	@Message		NVARCHAR(MAX)
		,	@Title			NVARCHAR(512)
		;

	DECLARE	@SCs AS TABLE (
				SC				TINYINT
			,	isExpanded		BIT
			,	isCash			TINYINT
			,	isDone			BIT
			,	PRIMARY KEY CLUSTERED (SC)
			);

	DECLARE	@Tmp_DailySummary AS TABLE (
				SC				TINYINT
			,	gameTypeId		INT
			,	gameId			INT
			,	gameType		NVARCHAR(128)
			,	currency		VARCHAR(10)
			,	isCash			TINYINT
			,	phienCount		INT
			,	betCount		INT
			,	stake			DECIMAL(19,4)
			,	winLost			DECIMAL(19,4)
			,	payOut			DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency, isCash)
			);

	CREATE TABLE	#OW_DailySummary (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	isCash			TINYINT
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency, isCash)
					);

	CREATE TABLE	#DS_DailySummary (
						SC				TINYINT
					,	gameId			INT
					,	gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	isCash			TINYINT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency, isCash)
					);

	-- List of SCs --
	INSERT INTO	@SCs
			(SC, isExpanded, isCash, isDone)
	VALUES	( 1,          0,      0,      0)
		, 	( 2,          0,      1,      0)
		, 	( 3,          1,   NULL,      0)
		;

	-- OW Query --
	BEGIN;
		SELECT	@OW_Query = N'';
		SELECT	@OW_Query += N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	[gameTypeId]	= b.gameId
	,	[gameType]		= g.typenamee
	,	[currency]		= b.CurrencyName
	,	[isCash]		= ISNULL(s.custid / s.custid, 0)
	,	[phienCount]	= COUNT(DISTINCT b.GameId3rd)
	,	[betCount]		= COUNT(1)
	,	[stake]			= SUM(b.stake)
	,	[payOut]		= SUM(b.winlost)
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
LEFT JOIN	dbo.Dep_CustSuper AS s WITH (NOLOCK)
		ON	b.srecommend = s.custid
WHERE	b.vendorID = @VendorId
	AND	b.gameID BETWEEN 1611 AND 1697
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID NOT IN (101, 102, 0) -- Reject, Void, running
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName, s.custid / s.custid
OPTION (RECOMPILE);
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_DailySummary (gameTypeId, gameType, currency, isCash, phienCount, betCount, stake, payOut)
		EXECUTE	DB061KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @_ReportDate;

		RAISERROR('Executed on OW', 0, 0) WITH NOWAIT;
	END;

	SELECT	@DS_Query = N'';
	SELECT	@DS_Query += N'\
SELECT	0 AS SC
	,	cfg.owGameTypeId AS gameTypeId
	,	cfg.gameId AS gameId
	,	cfg.`name.en` AS gameType
	,	IFNULL(ds.currency, "null") AS currency
	,	IFNULL(ds.isCash, 2) AS isCash
	,	ds.tickets AS betCount
	,	ds.stake AS stake
	,	ds.payOut AS payOut
FROM		summary.daily_summaries AS ds
INNER JOIN	summary.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	ds.time >= "' + CONVERT(NVARCHAR(MAX), @_ReportDate, 127) + N'"
	AND	ds.time < "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_ReportDate), 127) + N'"
';

	BEGIN;
		UPDATE	@SCs
		SET		isDone = 0;

		WHILE	EXISTS (SELECT 1 FROM @SCs WHERE isDone = 0)
		BEGIN;
			UPDATE	TOP(1)
					@SCs
			SET		@SC		= SC
				,	@isCash	= isCash
				,	isDone	= 1
			WHERE	isDone = 0;

			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, isCash, betCount, stake, payOut)
			EXECUTE	base.ExecuteSabaQuery @DS_Query, @SC, 0;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.SC = @SC
					AND	COALESCE(NULLIF(ds.isCash, 2), @isCash, 2) = COALESCE(NULLIF(tmp.isCash, 2), @isCash, 2)
					AND	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	( SC,     gameTypeId,     gameId,     gameType,     currency,                     isCash                 ,     betCount,     stake,     payOut)
				VALUES	(@SC, tmp.gameTypeId, tmp.gameId, tmp.gameType, tmp.currency, COALESCE(NULLIF(tmp.isCash, 2), @isCash, 2), tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('Executed on SC%d.', 0, 0, @SC) WITH NOWAIT;
		END;
	END;

	-- Reuse @Tmp_DailySummary for checking mismatch --
	DELETE	@Tmp_DailySummary;
	INSERT INTO	@Tmp_DailySummary (SC, gameTypeId, gameId, gameType, currency, isCash, betCount, stake, winLost)
	SELECT	[SC]			= ISNULL(sb.SC, 0)
		,	[gameTypeId]	= ISNULL(ow.gameTypeId, sb.gameTypeId)
		,	[gameId]		= ISNULL(sb.gameId, 0)
		,	[gameType]		= ISNULL(ow.gameType, sb.gameType)
		,	[currency]		= ISNULL(ow.currency, sb.currency)
		,	[isCash]		= ISNULL(ow.isCash, sb.isCash)
		,	[betCount]		= ISNULL(ow.betCount, 0) - ISNULL(sb.betCount, 0)
		,	[stake]			= ISNULL(ow.stake, 0) -ISNULL(sb.stake, 0)
		,	[winLost]		= ISNULL(ow.stake - ow.payOut, 0) - ISNULL(sb.stake - sb.payOut, 0)
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#DS_DailySummary AS sb
				ON	ow.gameTypeId = sb.gameTypeId
				AND	ow.currency = sb.currency
				AND	ow.isCash = sb.isCash
	WHERE	COALESCE(ow.currency, sb.currency) <> 'UUS'
		AND	(	ISNULL(ow.betCount, 0) <> ISNULL(sb.betCount, 0)
			OR	ISNULL(ow.stake, 0) <> ISNULL(sb.stake, 0)
			OR	ISNULL(ow.payOut, 0) <> ISNULL(sb.payOut, 0)
			);

	IF	EXISTS (SELECT 1 FROM @Tmp_DailySummary)
	-- TRUE - Has mismatch --
	BEGIN;
		SELECT	@Status = N'MISMATCH';

		WHILE	EXISTS (SELECT 1 FROM @Tmp_DailySummary)
		BEGIN;
			SELECT	TOP(1)
					@SC			= SC
				,	@GameId		= gameId
				,	@GameType	= gameType
				,	@GameTypeId	= gameTypeId
			FROM	@Tmp_DailySummary
			ORDER BY SC, gameId;

			SELECT	@Title		= @Status + N'] [Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
				,	@Message	= N'[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' (' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N')] ' + @GameType + N': (BC|TO|WL)' + msg.str
			FROM	(
				SELECT	N'
[' + currency + N' (' + CASE isCash WHEN 0 THEN N'CRE' WHEN 1 THEN N'DEP' WHEN 2 THEN N'null' ELSE N'invalid' END + N')]'
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
						@To			= @Letstalk
					,	@Title		= @Title
					,	@Msg		= @Message
					;

			SELECT	@Message = N'\\\[' + @Status + N'\] \\\[Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]  
\\\[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' \(' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N'\)\] ' + @GameType + N': \(BC\|TO\|WL\)'
							 + msg.str
			FROM	(
				SELECT	N'  
\\\[' + currency + N' \(' + CASE isCash WHEN 0 THEN N'CRE' WHEN 1 THEN N'DEP' WHEN 2 THEN N'null' ELSE N'invalid' END + N'\)\]'
+ N' ' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(betCount AS MONEY), 1), '.00', '')
+ N'\|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(stake AS MONEY), 1), '.00', '')
+ N'\|' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(winLost AS MONEY), 1), '.00', '')
				FROM	@Tmp_DailySummary
				WHERE	SC = @SC
					AND	gameId = @GameId
				ORDER BY currency, isCash
				FOR XML PATH ('')
				,	TYPE
			) AS xmsg(xml)
			CROSS APPLY	(
				SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
			) AS msg(str);

			EXECUTE	DBNOTI.NotificationDB.dbo.Skype_SendMessage
						@To			= @Telegram
					,	@Msg		= @Message
					;
					;

			DELETE	@Tmp_DailySummary
			WHERE	SC = @SC
				AND	gameId = @GameId;
		END;
	END;


	BEGIN;
		SELECT	@Title		= @Status + N'] [Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
			,	@Message	= msg.str
		FROM	(
			SELECT	N'

SC' + CONVERT(NVARCHAR(MAX), dsb.SC) + N':' + c.str
			FROM	(
				SELECT	SC, isExpanded
				FROM	@SCs
			) AS dsb
			CROSS APPLY	(
				SELECT	N'
    ' + grp.CurGrp + N'
      - BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'
      - TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake AS MONEY)), 1) + N'
      - WL: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake - sb.payOut AS MONEY)), 1)
				FROM		#DS_DailySummary AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded
											WHEN 1 THEN N'(' + CASE sb.isCash WHEN 0 THEN N'Cre' WHEN 1 THEN N'Dep' WHEN 2 THEN N'nul' ELSE N'***' END + N') ' +  UPPER(sb.currency)
											ELSE N'Total'
										  END
				) AS grp
				WHERE	sb.currency <> 'UUS'
					AND	sb.SC = dsb.SC
				GROUP BY grp.CurGrp
				ORDER BY grp.CurGrp
				FOR XML PATH ('')
				,	TYPE
			) AS xc(xml)
			CROSS APPLY	(
				SELECT	xc.xml.value('.', 'NVARCHAR(MAX)')
			) AS c(str)
			ORDER BY dsb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);

		EXECUTE	DBNOTI.NotificationDB.dbo.Letstalk_SendMessage
					@To			= @Letstalk
				,	@Title		= @Title
				,	@Msg		= @Message
				;

		SELECT	@Message	= N'\\\[' + @Status + N'\] \\\[Summary ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]' + msg.str
		FROM	(
			SELECT	N'  

---
SC' + CONVERT(NVARCHAR(MAX), dsb.SC) + N':' + c.str
			FROM	(
				SELECT	SC, isExpanded
				FROM	@SCs
			) AS dsb
			CROSS APPLY	(
				SELECT	N'  
    `' + grp.CurGrp + N'`  
      \- BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'  
      \- TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake AS MONEY)), 1) + N'  
      \- WL: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.stake - sb.payOut AS MONEY)), 1)
				FROM		#DS_DailySummary AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded
											WHEN 1 THEN N'(' + CASE sb.isCash WHEN 0 THEN N'Cre' WHEN 1 THEN N'Dep' WHEN 2 THEN N'nul' ELSE N'***' END + N') ' +  UPPER(sb.currency)
											ELSE N'Total'
										  END
				) AS grp
				WHERE	sb.currency <> 'UUS'
					AND	sb.SC = dsb.SC
				GROUP BY grp.CurGrp
				ORDER BY grp.CurGrp
				FOR XML PATH ('')
				,	TYPE
			) AS xc(xml)
			CROSS APPLY	(
				SELECT	xc.xml.value('.', 'NVARCHAR(MAX)')
			) AS c(str)
			ORDER BY dsb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);

		EXECUTE	DBNOTI.NotificationDB.dbo.Skype_SendMessage
					@To			= @Telegram
				,	@Msg		= @Message
				;
	END;
END;
GO
EXECUTE	Noti.DailySummaryReport NULL, 1;
GO
