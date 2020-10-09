USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('dbo.GFN_YesterdaySummary') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.GFN_YesterdaySummary AS';
END;
GO
ALTER PROCEDURE	dbo.GFN_YesterdaySummary
WITH ENCRYPTION
AS
BEGIN;
	DECLARE	@Query		NVARCHAR(MAX);

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	ds.`time` AS time
	,	cfg.`name.en` AS metric
	,	ds.`stake` AS value
FROM		summary.game_summary_config AS cfg
INNER JOIN	summary.daily_summaries AS ds
		ON	ds.gameId = cfg.gameId
WHERE	ds.currency <> "UUS"
	AND	ds.time >= "' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, -2, GETUTCDATE()), 121) + N'"
GROUP BY ds.`time`, cfg.`name.en`
ORDER BY time, value ASC;
';

	EXECUTE	(@Query) AT L1_SABABI;
END;
GO
