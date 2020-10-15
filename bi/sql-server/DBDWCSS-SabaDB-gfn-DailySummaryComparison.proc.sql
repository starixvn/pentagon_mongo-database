USE	SabaDB;
IF	OBJECT_ID('gfn.DailySummaryComparison') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.DailySummaryComparison AS';
END;
GO
ALTER PROCEDURE	gfn.DailySummaryComparison
					@ReportDate		DATETIME
				,	@Panel			TINYINT		= 1
WITH ENCRYPTION
AS
/*
	Creator:	20201008@Billy
	Task:		Compare Daily Summary result between OW and SB - [Gitlab: #000]
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

	DECLARE	@VendorId		INT = 42;

	DECLARE	@OW_Query		NVARCHAR(MAX)
		,	@OW_Param		NVARCHAR(MAX)
		,	@DS_Query		NVARCHAR(MAX)
		;

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

	DECLARE	@OW_DailySummary AS TABLE (
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

	DECLARE	@DS_DailySummary AS TABLE (
						gameTypeId		INT
					,	currency		VARCHAR(10)
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	DECLARE	@_ReportDate		DATETIME		= CAST(@ReportDate AS DATE);

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
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID <> 101 --Reject
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	@OW_DailySummary (gameTypeId, gameType, currency, phienCount, betCount, stake, winLost, payOut)
		EXECUTE	DB061KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @_ReportDate;

		RAISERROR('', 0, 0) WITH NOWAIT;
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
WHERE	ds.time >= ''' + CONVERT(NVARCHAR(MAX), @_ReportDate, 127) + N'''
	AND	ds.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_ReportDate), 127) + N'''
';

	BEGIN;
		-- L1
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L1_SABABI;

			MERGE INTO	@DS_DailySummary AS ds
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
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L2
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L2_SABABI;

			MERGE INTO	@DS_DailySummary AS ds
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
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L3
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L3_SABABI;

			MERGE INTO	@DS_DailySummary AS ds
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
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;
	END;

	IF	@Panel = 1
	BEGIN;
		SELECT	[Id]			= ow.gameTypeId
			,	[Game]			= ow.gameType
			,	[Currency]		= ow.currency
			,	[Round Cnt.]	= ow.phienCount
			,	[ ]				= '||'
			,	[(OW)]			= CASE	WHEN ow.betCount > sc.betCount THEN ow.betCount - sc.betCount
										ELSE 0 END
			,	[Ticket]		= CASE	WHEN ow.betCount > sc.betCount THEN -1
										WHEN ow.betCount < sc.betCount THEN 1
										ELSE '' END
			,	[(SC)]			= CASE	WHEN ow.betCount < sc.betCount THEN sc.betCount - ow.betCount
										ELSE 0 END
			,	[ ]				= '||'
			,	[(OW)]			= CASE	WHEN ow.stake > sc.stake THEN ow.stake - sc.stake
										ELSE 0 END
			,	[Stake]			= CASE	WHEN ow.stake > sc.stake THEN -1
										WHEN ow.stake < sc.stake THEN 1
										ELSE '' END
			,	[(SC)]			= CASE	WHEN ow.stake < sc.stake THEN sc.stake - ow.stake
										ELSE 0 END
			,	[ ]				= '||'
			,	[(OW)]			= CASE	WHEN ow.payOut > sc.payOut THEN ow.payOut - sc.payOut
										ELSE 0 END
			,	[PayOut]		= CASE	WHEN ow.payOut > sc.payOut THEN -1
										WHEN ow.payOut < sc.payOut THEN 1
										ELSE 0 END
			,	[(SC)]			= CASE	WHEN ow.payOut < sc.payOut THEN sc.payOut - ow.payOut
										ELSE 0 END
			,	[ ]				= '||'
			,	[Ticket Status]	= CASE	WHEN ow.betCount = sc.betCount THEN 1
										ELSE 0 END
			,	[Stake Status]	= CASE	WHEN ow.stake = sc.stake THEN 1
										ELSE 0 END
			,	[Payout Status]	= CASE	WHEN ow.payOut = sc.payOut THEN 1
										ELSE 0 END
		FROM			@OW_DailySummary AS ow
		FULL OUTER JOIN	@DS_DailySummary AS sc
					ON	ow.gameTypeId = sc.gameTypeId
					AND	ow.currency = sc.currency
		WHERE	ISNULL(ow.currency, sc.currency) <> 'UUS'
		ORDER BY CASE WHEN ISNULL(ow.currency, sc.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, sc.gameTypeId, ow.currency, sc.currency;
	END;
END;
GO
