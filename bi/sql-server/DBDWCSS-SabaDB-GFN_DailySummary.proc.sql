USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('dbo.GFN_DailySummary') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.GFN_DailySummary AS';
END;
GO
ALTER PROCEDURE	dbo.GFN_DailySummary
					@DateFrom			DATETIME
				,	@DateTo				DATETIME
				,	@Field				NVARCHAR(128)
WITH ENCRYPTION
AS
BEGIN;
	DECLARE	@Query		NVARCHAR(MAX);

	IF	@Field = 'winlost'
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	time, metric, value
FROM	(
	SELECT	ds.`time` AS time
		,	cfg.`name.en` AS metric
		,	CASE WHEN ds.`payout` - ds.`stake` >= 0 THEN ds.`payout` - ds.`stake` ELSE 0 END AS value
	FROM		summary_arc.daily_summaries AS ds
	INNER JOIN	summary_arc.game_summary_config AS cfg
			ON	ds.gameId = cfg.gameId
	WHERE	ds.currency <> "UUS"
		AND	ds.time >= "' + CONVERT(NVARCHAR(MAX), @DateFrom, 121) + N'"
		AND	ds.time <= "' + CONVERT(NVARCHAR(MAX), @DateTo, 121) + N'"
	GROUP BY ds.`time`, cfg.`name.en`
	UNION ALL
	SELECT	DATE_ADD(ds.`time`, INTERVAL 8 HOUR) AS time
		,	cfg.`name.en` AS metric
		,	CASE WHEN ds.`payout` - ds.`stake` < 0 THEN ds.`payout` - ds.`stake` ELSE 0 END AS value
	FROM		summary_arc.daily_summaries AS ds
	INNER JOIN	summary_arc.game_summary_config AS cfg
			ON	ds.gameId = cfg.gameId
	WHERE	ds.currency <> "UUS"
		AND	ds.time >= "' + CONVERT(NVARCHAR(MAX), @DateFrom, 121) + N'"
		AND	ds.time <= "' + CONVERT(NVARCHAR(MAX), @DateTo, 121) + N'"
	GROUP BY ds.`time`, cfg.`name.en`
) AS tbl
ORDER BY time, value ASC;
';
	END;
	ELSE
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	ds.`time` AS time
	,	cfg.`name.en` AS metric
	,	ds.`' + @field + '` AS value
FROM		summary_arc.game_summary_config AS cfg
INNER JOIN	summary_arc.daily_summaries AS ds
		ON	ds.gameId = cfg.gameId
WHERE	ds.currency <> "UUS"
	AND	ds.time >= "' + CONVERT(NVARCHAR(MAX), @DateFrom, 121) + N'"
	AND	ds.time <= "' + CONVERT(NVARCHAR(MAX), @DateTo, 121) + N'"
GROUP BY ds.`time`, cfg.`name.en`
ORDER BY time, value ASC;
';
	END;

	EXECUTE	(@Query) AT L1_SABAARCBI;
END;
GO
