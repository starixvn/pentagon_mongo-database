USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.SmartBotReport_MetaData') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.SmartBotReport_MetaData AS';
END;
GO
ALTER PROCEDURE	gfn.SmartBotReport_MetaData
					@Type			NVARCHAR(128)	= NULL
				,	@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
				,	@Var3			SQL_VARIANT		= NULL
				,	@Var4			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	EXECUTE	base.WaitForRandom 1;

	DECLARE	@Query			NVARCHAR(MAX)
		,	@Day			DATE
		;

	DECLARE	@_SC			SMALLINT		= ISNULL(CAST(@Var1 AS SMALLINT), 0)
		,	@_GameId		INT				= ISNULL(CAST(@Var2 AS INT), 0)
		,	@_Limit			SMALLINT		= ISNULL(CAST(@Var3 AS SMALLINT), 0)
		,	@_Day			DATE			= ISNULL(CAST(@Var4 AS DATE), GETUTCDATE())
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

	IF	@Type IN (N'TopDay')
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	DATE_FORMAT(tbl.time, "%Y-%m-%d") AS "time"
FROM	(
	SELECT	ds.time AS "time"
		,	SUM(ds.stake) AS "stake"
	FROM	summary_arc.daily_summaries AS ds
	WHERE	ds.gameId = ' + CAST(@_GameId AS NVARCHAR(MAX)) + N'
		AND	ds.currency <> "UUS"
	GROUP BY ds.time
	ORDER BY stake DESC
) AS tbl
LIMIT ' + CAST(@_Limit AS NVARCHAR(MAX)) + N';
';
		EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 1;
		RETURN;
	END;

	IF	@Type IN (N'TopGrp')
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
SELECT	SUBSTR(u.`local.memberName`, 1, 3) AS "group"
FROM	minigame.users AS u
WHERE	u.`local.memberId` IN (' + str + N')
GROUP BY SUBSTR(u.`local.memberName`, 1, 3)
ORDER BY COUNT(1) DESC, "group" ASC;
'
		FROM	@String;

		EXECUTE	base.ExecuteSabaQuery @Query, @_SC, 0;
		RETURN;
	END;
END;
GO
EXECUTE	gfn.SmartBotReport_MetaData N'TopDay', 1, 2, 10
EXECUTE	gfn.SmartBotReport_MetaData N'TopGrp', 1, 2, 20, "2020-09-20"
GO
