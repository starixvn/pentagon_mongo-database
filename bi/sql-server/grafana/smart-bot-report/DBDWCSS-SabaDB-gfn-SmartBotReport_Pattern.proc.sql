USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.SmartBotReport_Pattern') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.SmartBotReport_Pattern AS';
END;
GO
ALTER PROCEDURE	gfn.SmartBotReport_Pattern
					@Type			NVARCHAR(128)	= NULL
				,	@Var1			SQL_VARIANT		= NULL		-- SC
				,	@Var2			SQL_VARIANT		= NULL		-- GameId
				,	@Var3			SQL_VARIANT		= NULL		-- Limit
				,	@Var4			SQL_VARIANT		= NULL		-- Day
				,	@Var5			SQL_VARIANT		= NULL		-- Group
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query			NVARCHAR(MAX)
		,	@Day			DATE
		;

	EXECUTE	base.WaitForRandom 3;

	DECLARE	@_SC			SMALLINT		= ISNULL(CAST(@Var1 AS SMALLINT), 0)
		,	@_GameId		SMALLINT		= ISNULL(CAST(@Var2 AS SMALLINT), 0)
		,	@_Limit			SMALLINT		= ISNULL(CAST(@Var3 AS SMALLINT), 0)
		,	@_Day			DATE			= ISNULL(CAST(@Var4 AS DATE), GETUTCDATE())
		,	@_Group			NVARCHAR(128)	= ISNULL(CAST(@Var5 AS NVARCHAR(128)), 0)
		;

	DECLARE	@GameType AS TABLE (
				gameId		SMALLINT
			,	db			NVARCHAR(128)
			,	base		NVARCHAR(128)
			,	postfix		NVARCHAR(128)
			,	PRIMARY KEY CLUSTERED (gameId)
			);

	DECLARE	@String AS TABLE (
				str			NVARCHAR(MAX)
			);

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
	EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	GROUP_CONCAT(tbl.memberId SEPARATOR ", ")
FROM	(
	SELECT	b.memberId AS "memberId"
		,	SUM(IFNULL(b.odd, 0) + IFNULL(b.even, 0) + IFNULL(b.red2, 0) + IFNULL(b.red3, 0) + IFNULL(b.red4, 0) + IFNULL(b.white3, 0) + IFNULL(b.white4, 0)) AS "stake"
	FROM	`' + g.db + N'`.`' + g.base + g.postfix + N'` AS b
	WHERE	b.time >= "' + CONVERT(NVARCHAR(MAX), @_Day, 120) + N'"
		AND	b.time < "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_Day), 120) + N'"
		AND	b.`__archive.currency` <> "UUS"
	GROUP BY b.memberId
	ORDER BY stake DESC
	LIMIT ' + CAST(@_Limit AS NVARCHAR(MAX)) + N'
) AS tbl;
'
	FROM	@GameType AS g;

	INSERT INTO	@String (str)
	EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	GROUP_CONCAT(u.`local.memberId` SEPARATOR ", ")
FROM	minigame.users AS u
WHERE	u.`local.memberId` IN (' + str + N')
	AND	SUBSTR(u.`local.memberName`, 1, 3) = "' + @_Group + N'";
'
	FROM	@String;

	DELETE	@String;
	INSERT INTO	@String (str)
	EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 0;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	MIN(TIMESTAMP("3000-01-01") - TIMESTAMP("' + CONVERT(NVARCHAR(MAX), @_Day, 120) + N'") + TIMESTAMP(l.requestTimeStamp)) AS "time"
	,	TRIM(l.`call.obCustId`) AS "metric"
	,	SUM(l.`call.amount`) AS "value"
FROM	log_arc.bets_bk AS l
WHERE	l.requestTimeStamp >= "' + CONVERT(NVARCHAR(MAX), @_Day, 120) + N'"
	AND	l.requestTimeStamp < "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @_Day), 120) + N'"
	AND	`call.obCustId` IN (' + str + N')
	AND	`call.gameTypeId` = ' + CAST(@_GameId AS NVARCHAR(MAX)) + N'
GROUP BY l.`call.gameRoundId`, l.`call.obCustId`
ORDER BY time;
'
	FROM	@String;

	EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1;
END;
GO

EXECUTE gfn.SmartBotReport_Pattern N'', 1, 2, 20, "2020-09-20", "TVI"
