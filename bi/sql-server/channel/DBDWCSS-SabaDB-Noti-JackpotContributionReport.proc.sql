USE	SabaDB;
IF	OBJECT_ID('Noti.JackpotContributionReport') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE Noti.JackpotContributionReport AS';
END;
GO
ALTER PROCEDURE	Noti.JackpotContributionReport
					@ReportDate		DATETIME		= NULL
				,	@isTest			BIT				= 0
WITH ENCRYPTION
AS
/*
	Creator:	20210324@Billy
	Task:		Compare Jackpot related result between OW and SB then send result via Notification Channel - [Gitlab: #059]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20210324@Billy:	Initial - [Gitlab: #059]

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
		,	@GameId			INT
		,	@GameType		NVARCHAR(128)
		,	@GameTypeId		INT
		,	@Message		NVARCHAR(MAX)
		,	@Title			NVARCHAR(512)
		;

	DECLARE	@SCs AS TABLE (
				SC				TINYINT
			,	isExpanded		BIT
			,	isDone			BIT
			,	PRIMARY KEY CLUSTERED (SC)
			);

	DECLARE	@Tmp_JPContribution AS TABLE (
				SC				TINYINT
			,	gameTypeId		INT
			,	gameId			INT
			,	gameType		NVARCHAR(128)
			,	currency		VARCHAR(10)
			,	JPCont			DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency)
			);

	CREATE TABLE	#OW_JPContribution (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	custCount		INT
					,	JPCont			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#DS_JPContribution (
						SC				TINYINT
					,	gameId			INT
					,	gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	JPCont			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (SC, gameTypeId, currency)
					);

	-- List of SCs --
	INSERT INTO	@SCs
			(SC, isExpanded, isDone)
	VALUES	( 2,          0,      0)
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
	,	[JPCont]		= SUM(-b.awinlost)
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
WHERE	b.vendorID = @VendorId
	AND	b.gameID = 1698
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID NOT IN (101, 102, 0) -- Reject, Void, running
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName
OPTION (RECOMPILE);
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_JPContribution (gameTypeId, gameType, currency, JPCont)
		EXECUTE	DB061KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @_ReportDate;

		RAISERROR('', 0, 0) WITH NOWAIT;
	END;

	SELECT	@DS_Query = N'';
	SELECT	@DS_Query += N'\
SELECT	0 AS SC
	,	1698 AS gameTypeId
	,	cfg.gameId AS gameId
	,	cfg.`name.en` AS gameType
	,	IFNULL(ds.currency, "null") AS currency
	,	ds.stake * 0.025 AS JPCont
FROM		summary.daily_summaries AS ds
INNER JOIN	summary.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	cfg.`name.grp` = "Slots"
	AND	ds.time >= "' + CONVERT(NVARCHAR(MAX), @_ReportDate, 127) + N'"
	AND	ds.time < "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_ReportDate), 127) + N'"
';

	BEGIN;
		UPDATE	@SCs
		SET		isDone = 0;

		WHILE	EXISTS (SELECT 1 FROM @SCs WHERE isDone = 0)
		BEGIN;
			UPDATE	TOP(1)
					@SCs
			SET		@SC = SC
				,	isDone = 1
			WHERE	isDone = 0;

			DELETE	@Tmp_JPContribution;
			INSERT INTO	@Tmp_JPContribution (SC, gameTypeId, gameId, gameType, currency, JPCont)
			EXECUTE	base.ExecuteSabaQuery @DS_Query, @SC, 0;

			MERGE INTO	#DS_JPContribution AS ds
			USING		@Tmp_JPContribution AS tmp
					ON	ds.SC = @SC
					AND	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.JPCont += tmp.JPCont
			WHEN NOT MATCHED THEN
				INSERT	( SC,     gameTypeId,     gameId,     gameType,     currency,     JPCont)
				VALUES	(@SC, tmp.gameTypeId, tmp.gameId, tmp.gameType, tmp.currency, tmp.JPCont)
			;
			RAISERROR('Executed on SC%d.', 0, 0, @SC) WITH NOWAIT;
		END;
	END;

	-- Reuse @Tmp_JPContribution for checking mismatch --
	DELETE	@Tmp_JPContribution;
	INSERT INTO	@Tmp_JPContribution (SC, gameTypeId, gameId, gameType, currency, JPCont)
	SELECT	[SC]			= ISNULL(sb.SC, 0)
		,	[gameTypeId]	= ISNULL(ow.gameTypeId, sb.gameTypeId)
		,	[gameId]		= ISNULL(sb.gameId, 0)
		,	[gameType]		= ISNULL(ow.gameType, sb.gameType)
		,	[currency]		= ISNULL(ow.currency, sb.currency)
		,	[JPCont]		= ISNULL(ow.JPCont, 0) -ISNULL(sb.JPCont, 0)
	FROM			#OW_JPContribution AS ow
	FULL OUTER JOIN	#DS_JPContribution AS sb
				ON	ow.gameTypeId = sb.gameTypeId
				AND	ow.currency = sb.currency
	WHERE	COALESCE(ow.currency, sb.currency) <> 'UUS'
		AND	(	ISNULL(ow.JPCont, 0) <> ISNULL(sb.JPCont, 0)
			);

	IF	EXISTS (SELECT 1 FROM @Tmp_JPContribution)
	-- TRUE - Has mismatch --
	BEGIN;
		SELECT	@Status = N'MISMATCH';

		WHILE	EXISTS (SELECT 1 FROM @Tmp_JPContribution)
		BEGIN;
			SELECT	TOP(1)
					@SC			= SC
				,	@GameId		= gameId
				,	@GameType	= gameType
				,	@GameTypeId	= gameTypeId
			FROM	@Tmp_JPContribution
			ORDER BY SC, gameId;

			SELECT	@Title		= @Status + N'] [Jackpot Contribution ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
				,	@Message	= N'[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' (' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N')] ' + @GameType + N': (JC)' + msg.str
			FROM	(
				SELECT	N'
[' + currency + N']'
+ N' ' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(JPCont AS MONEY), 1), '.00', '')
				FROM	@Tmp_JPContribution
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

			SELECT	@Message = N'\\\[' + @Status + N'\] \\\[Jackpot Contribution ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]  
\\\[SC' + CONVERT(NVARCHAR(MAX), @SC) + N' \(' + CONVERT(NVARCHAR(MAX), @gameTypeId) + N'.' + CONVERT(NVARCHAR(MAX), @gameId) + N'\)\] ' + @GameType + N': \(JC\)'
							 + msg.str
			FROM	(
				SELECT	N'  
\\\[' + currency + N'\]'
+ N' ' + REPLACE(CONVERT(NVARCHAR(MAX), CAST(JPCont AS MONEY), 1), '.00', '')
				FROM	@Tmp_JPContribution
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
						@To			= @Telegram
					,	@Msg		= @Message
					;
					;

			DELETE	@Tmp_JPContribution
			WHERE	SC = @SC
				AND	gameId = @GameId;
		END;
	END;


	BEGIN;
		SELECT	@Title		= @Status + N'] [Jackpot Contribution ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23)
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
      - JC: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.JPCont AS MONEY)), 1)
				FROM		#DS_JPContribution AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded WHEN 1 THEN UPPER(sb.currency) ELSE N'Total' END
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

		SELECT	@Message	= N'\\\[' + @Status + N'\] \\\[Jackpot Contribution ' + CONVERT(NVARCHAR(MAX), @_ReportDate, 23) + N'\]' + msg.str
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
      \- JC: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.JPCont AS MONEY)), 1)
				FROM		#DS_JPContribution AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded WHEN 1 THEN UPPER(sb.currency) ELSE N'Total' END
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
EXECUTE	Noti.JackpotContributionReport NULL, 1;
GO
