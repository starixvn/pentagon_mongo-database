USE	SabaDB;
IF	OBJECT_ID('dbo.DailySummaryComparison') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.DailySummaryComparison AS';
END;
GO
ALTER PROCEDURE	dbo.DailySummaryComparison
					@ReportDate		DATETIME
WITH ENCRYPTION
AS
/*
	Creator:	20201008@Billy
	Task:		Compare Daily Summary result between - [Gitlab: #000]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20201008@Billy:	Initial - [Gitlab: #000]

	Developer's Notes:
		- @ReportDate:				[REQUIRED]		- The date of data that will be compared. The time is in UTC timezone.
		- @Param2:					[optional]		- Param2 Description
						<DEFAULT>	NULL			- Value Description
		- @Param3:					[optional]		- Param3 Description
									123456			- Value Description

*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@VendorId		INT				= 42
		,	@L				SMALLINT
		;

	DECLARE	@OW_Query		NVARCHAR(MAX)
		,	@OW_Param		NVARCHAR(MAX)
		,	@DS_Query		NVARCHAR(MAX)
		,	@DS_Arc_Query	NVARCHAR(MAX)
		;

	DECLARE	@Ls AS TABLE (
				L				SMALLINT
			,	isDone			BIT
			,	PRIMARY KEY CLUSTERED (L)
			);

	DECLARE	@Tmp_DailySummary AS TABLE (
				gameTypeId		INT
			,	currency		VARCHAR(10)
			,	phienCount		INT
			,	betCount		INT
			,	stake			DECIMAL(19,4)
			,	winLost			DECIMAL(19,4)
			,	payOut			DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
			);

	CREATE TABLE	#OW_DailySummary (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	winLost			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#DS_DailySummary (
						gameTypeId		INT
					,	currency		VARCHAR(10)
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#DS_Arc_DailySummary (
						gameTypeId		INT
					,	currency		VARCHAR(10)
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	INSERT INTO	@Ls (L)
	VALUES	(1), (2), (3);

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
	,	[winLost]		= SUM(b.winlost - b.stake)
	,	[payOut]		= SUM(b.winlost)
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
WHERE	b.vendorID = @VendorId
	AND	b.gameID BETWEEN 1611 AND 1697
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID NOT IN (101, 102, 0) -- Reject, Void, running
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_DailySummary (gameTypeId, gameType, currency, phienCount, betCount, stake, winLost, payOut)
		EXECUTE	DB061KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @ReportDate;

		RAISERROR(N'OW', 0, 0) WITH NOWAIT;
	END;

	SELECT	@DS_Query = N'';
	SELECT	@DS_Query += N'\
SELECT	cfg.owGameTypeId AS gameTypeId
	,	IFNULL(ds.currency, "null") AS currency
	,	ds.tickets AS betCount
	,	ds.stake AS stake
	,	ds.payOut AS payOut
FROM		summary.daily_summaries AS ds
INNER JOIN	summary.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	ds.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	ds.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
';

	SELECT	@DS_Arc_Query = N'';
	SELECT	@DS_Arc_Query += N'\
SELECT	cfg.owGameTypeId AS gameTypeId
	,	IFNULL(ds.currency, "null") AS currency
	,	ds.tickets AS betCount
	,	ds.stake AS stake
	,	ds.payOut AS payOut
FROM		summary_arc.daily_summaries AS ds
INNER JOIN	summary_arc.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	ds.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	ds.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
';

	UPDATE	@Ls
	SET		isDone = 0;

	WHILE	0 = 0
	BEGIN;
		UPDATE	TOP(1)
				@Ls
		SET		@L		= L
			,	isDone	= 1
		WHERE	isDone	= 0;

		IF	@@ROWCOUNT = 0
			BREAK;

		DELETE	@Tmp_DailySummary;
		INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
		EXECUTE	base.ExecuteSabaQuery @DS_Query, @L, 0;

		MERGE INTO	#DS_DailySummary AS ds
		USING		@Tmp_DailySummary AS tmp
				ON	ds.gameTypeId = tmp.gameTypeId
				AND	ds.currency = tmp.currency
		WHEN MATCHED THEN
			UPDATE
			SET	ds.betCount += tmp.betCount
			,	ds.stake += tmp.stake
			,	ds.payOut += tmp.payOut
		WHEN NOT MATCHED THEN
			INSERT	(    gameTypeId,     currency,     betCount,     stake,     payOut)
			VALUES	(tmp.gameTypeId, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
		;

		DELETE	@Tmp_DailySummary;
		INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
		EXECUTE	base.ExecuteSabaQuery @DS_Arc_Query, @L, 1;

		MERGE INTO	#DS_Arc_DailySummary AS ds
		USING		@Tmp_DailySummary AS tmp
				ON	ds.gameTypeId = tmp.gameTypeId
				AND	ds.currency = tmp.currency
		WHEN MATCHED THEN
			UPDATE
			SET	ds.betCount += tmp.betCount
			,	ds.stake += tmp.stake
			,	ds.payOut += tmp.payOut
		WHEN NOT MATCHED THEN
			INSERT	(    gameTypeId,     currency,     betCount,     stake,     payOut)
			VALUES	(tmp.gameTypeId, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
		;

		RAISERROR(N'SC%d', 0, 0, @L) WITH NOWAIT;
	END;

	SELECT	[OW =>] = ''
		,	ow.*
		,	[||] = '||'
		,	[Atv =>] = ''
		,	atv.*
		,	[||] = '||'
		,	[Arc =>] = ''
		,	arc.*
		,	[||] = '||'
		,	[bet]		= CASE	WHEN ow.betCount = atv.betCount AND ow.betCount = arc.betCount THEN '   OK   '
								WHEN ow.betCount = atv.betCount AND (arc.betCount IS NULL OR ow.betCount <> arc.betCount) THEN '---ARC---'
								WHEN (atv.betCount IS NULL OR ow.betCount <> atv.betCount) AND ow.betCount = arc.betCount THEN '---ATV---'
								WHEN (ow.betCount IS NULL OR ow.betCount <> atv.betCount) AND atv.betCount = arc.betCount THEN '---OW---'
								ELSE '---NG---' END
		,	[stake]		= CASE	WHEN ow.stake = atv.stake AND ow.stake = arc.stake THEN '   OK   '
								WHEN ow.stake = atv.stake AND (arc.stake IS NULL OR ow.stake <> arc.stake) THEN '---ARC---'
								WHEN (atv.stake IS NULL OR ow.stake <> atv.stake) AND ow.stake = arc.stake THEN '---ATV---'
								WHEN (ow.stake IS NULL OR ow.stake <> atv.stake) AND atv.stake = arc.stake THEN '---OW---'
								ELSE '---NG---' END
		,	[payOut]	= CASE	WHEN ow.payOut = atv.payOut AND ow.payOut = arc.payOut THEN '   OK   '
								WHEN ow.payOut = atv.payOut AND (arc.payOut IS NULL OR ow.payOut <> arc.payOut) THEN '---ARC---'
								WHEN (atv.payOut IS NULL OR ow.payOut <> atv.payOut) AND ow.payOut = arc.payOut THEN '---ATV---'
								WHEN (ow.payOut IS NULL OR ow.payOut <> atv.payOut) AND atv.payOut = arc.payOut THEN '---OW---'
								ELSE '---NG---' END
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#DS_DailySummary AS atv
				ON	ow.gameTypeId = atv.gameTypeId
				AND	ow.currency = atv.currency
	FULL OUTER JOIN	#DS_Arc_DailySummary AS arc
				ON	atv.gameTypeId = arc.gameTypeId
				AND	atv.currency = arc.currency
	WHERE	COALESCE(ow.currency, atv.currency, arc.currency) <> 'UUS'
	ORDER BY CASE WHEN COALESCE(ow.currency, atv.currency, arc.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, atv.gameTypeId, arc.gameTypeId, ow.currency, atv.currency, arc.currency;
END;
GO
