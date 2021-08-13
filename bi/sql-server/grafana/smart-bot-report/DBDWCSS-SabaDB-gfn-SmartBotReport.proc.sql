USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.SmartBotReport') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.SmartBotReport AS';
END;
GO
ALTER PROCEDURE	gfn.SmartBotReport
					@Type			NVARCHAR(128)	= NULL
				,	@Var1			SQL_VARIANT		= NULL		-- SC
				,	@Var2			SQL_VARIANT		= NULL		-- GameId
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query			NVARCHAR(MAX)
		,	@Day			DATE
		;

	DECLARE	@_SC			SMALLINT		= CAST(@Var1 AS SMALLINT)
		,	@_GameId		INT				= CAST(@Var2 AS INT)
		;

	DECLARE	@GameType AS TABLE (
				gameId		SMALLINT
			,	db			NVARCHAR(128)
			,	base		NVARCHAR(128)
			,	postfix		NVARCHAR(128)
			,	PRIMARY KEY CLUSTERED (gameId)
			);

	DECLARE	@TopDay AS TABLE (
				gameId		SMALLINT
			,	time		DATE
			,	stake		MONEY
			,	tickets		INT
			,	isDone		BIT
			,	PRIMARY KEY CLUSTERED (gameId, time)
			);

	DECLARE	@TopMem AS TABLE (
				time		DATE
			,	memberId	INT
			,	currency	NVARCHAR(128)
			,	stake		MONEY
			,	PRIMARY KEY CLUSTERED (time, memberId)
			);

	IF	@Type IN (N'')
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	cfg.gameId AS "gameId"
	,	cfg.`coll.db` AS "db"
	,	cfg.`coll.group` AS "base"
	,	cfg.`coll.postfix` AS "postfix"
FROM	summary_arc.game_summary_config AS cfg
WHERE	cfg.gameId = ' + CAST(@_GameId AS NVARCHAR(MAX)) + N'
LIMIT 1;
';
		INSERT INTO	@GameType (gameId, db, base, postfix)
		EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1, 1;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	ds.gameId AS "gameId"
	,	ds.time AS "time"
	,	SUM(ds.stake) AS "stake"
	,	SUM(ds.tickets) AS "tickets"
	,	0 AS "isDone"
FROM	summary_arc.daily_summaries AS ds
WHERE	ds.gameId = ' + CAST(@_GameId AS NVARCHAR(MAX)) + N'
GROUP BY gameId, time
ORDER BY gameId, stake DESC
LIMIT 10;
';
		INSERT INTO	@TopDay (gameId, time, stake, tickets, isDone)
		EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1, 1;

		WHILE	0 = 0
		BEGIN;
			UPDATE	TOP(1) tmp
			SET		@Day	= tmp.time
				,	isDone	= 1
			FROM	@TopDay AS tmp
			WHERE	isDone = 0;

			IF	@@ROWCOUNT = 0
				BREAK;

			SELECT	@Query = N'';
			SELECT	@Query += N'\
SELECT	"' + CONVERT(NVARCHAR(MAX), @Day, 120) + N'" AS "time"
	,	b.memberId AS "memberId"
	,	b.`__archive.currency` AS "currency"
	,	SUM(IFNULL(b.odd, 0) + IFNULL(b.even, 0) + IFNULL(b.red2, 0) + IFNULL(b.red3, 0) + IFNULL(b.red4, 0) + IFNULL(b.white3, 0) + IFNULL(b.white4, 0)) AS "stake"
FROM	`' + g.db + N'`.`' + g.base + g.postfix + N'` AS b
WHERE	b.time >= "' + CONVERT(NVARCHAR(MAX), @Day, 120) + N'"
	AND	b.time < "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @Day), 120) + N'"
	AND	b.`__archive.currency` <> "UUS"
GROUP BY b.memberId
ORDER BY stake DESC
LIMIT 10;
'
			FROM	@GameType AS g;

			INSERT INTO	@TopMem (time, memberId, currency, stake)
			EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1, 1;
		END;

		SELECT	*
		FROM	@TopMem;

		RETURN;
	END;
END;
GO
EXECUTE	gfn.SmartBotReport '', 1, 22
GO

EXECUTE	(N'\
SELECT	requestTimeStamp, `call.obCustId`, `call.currency`, `call.gameRoundId`, `call.choiceId`, `call.amount`
FROM	log_arc.bets_bk
WHERE	`call.gameTypeId` = 22
	AND	`call.obCustId` = 47554782
	AND	requestTimeStamp >= "2021-01-05 00:00:00.0000000"
	AND	requestTimeStamp < "2021-01-06 00:00:00.0000000"
ORDER BY requestTimeStamp
') AT L1_SABAARCBI

EXECUTE	(N'\
SELECT	`call.obCustId`, `call.currency`, SUM(`call.amount`) AS stake
FROM	log_arc.bets_bk
WHERE	`call.gameTypeId` = 22
	AND	`call.obCustId` = 47554782
	AND	requestTimeStamp >= "2021-01-05 00:00:00.0000000"
	AND	requestTimeStamp < "2021-01-06 00:00:00.0000000"
ORDER BY requestTimeStamp
') AT L1_SABAARCBI
