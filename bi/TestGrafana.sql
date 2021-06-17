USE	SabaDB;
EXECUTE	dbo.sp_MSR_InitProcedure N'TestGrafana', N'gfn';
GO
ALTER PROCEDURE	gfn.TestGrafana
					@Var1		SQL_VARIANT		= NULL
				,	@Var2		SQL_VARIANT		= NULL
				,	@Var3		SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
BEGIN;
	DECLARE	@FromDate		DATETIME
		,	@ToDate			DATETIME
		,	@ValueCol		NVARCHAR(128)
		;

	DECLARE	@Query			NVARCHAR(MAX)
		;

	BEGIN TRY; SELECT @FromDate = CONVERT(DATETIME     , @Var1); END TRY BEGIN CATCH SELECT @FromDate = NULL; END CATCH;
	BEGIN TRY; SELECT @ToDate   = CONVERT(DATETIME     , @Var2); END TRY BEGIN CATCH SELECT @ToDate   = NULL; END CATCH;
	BEGIN TRY; SELECT @ValueCol = CONVERT(NVARCHAR(128), @Var3); END TRY BEGIN CATCH SELECT @ValueCol = NULL; END CATCH;

	SELECT	@FromDate	= CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE)
		,	@ToDate		= CAST(GETUTCDATE() AS DATE)
		,	@ValueCol	= CASE @ValueCol WHEN N'betCount' THEN N'bs.`betCount`' WHEN N'turnOver' THEN N'bs.`totalAmount`' ELSE N'0' END
		;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	MIN(bs.time) AS `time`
	,	CONCAT(CASE bs.system WHEN 1 THEN "Cocos" WHEN 2 THEN "Mobi" ELSE "---" END, ",", cfg.`name.grp`, ",", cfg.`name.en`) AS `metric`
	,	SUM(' + @ValueCol + N') AS `value`
FROM		summary.betlog_summaries AS bs
INNER JOIN	summary.game_summary_config AS cfg
		ON	bs.gameId = cfg.gameId
WHERE	bs.time >= "' + CONVERT(NVARCHAR(MAX), @FromDate, 121) + '"
	AND	bs.time < "' + CONVERT(NVARCHAR(MAX), @ToDate, 121) + '"
GROUP BY bs.gameId, bs.system
';
	EXECUTE	base.ExecuteSabaQuery @Query, 1, 0;
END;
GO
EXECUTE	gfn.TestGrafana