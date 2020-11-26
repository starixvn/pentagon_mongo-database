USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.SummaryByDate') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.SummaryByDate AS';
END;
GO
ALTER PROCEDURE	gfn.SummaryByDate
					@ReportDate			DATETIME		= NULL
				,	@L					TINYINT			= NULL
				,	@Field				NVARCHAR(128)	= NULL
				,	@GroupBy			NVARCHAR(128)	= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@_ReportDate		DATETIME	= CAST(ISNULL(@ReportDate, DATEADD(DAY, -1, GETUTCDATE())) AS DATE)
		;

	DECLARE	@Query		NVARCHAR(MAX)
		,	@WaitFor	VARCHAR(16)		= '00:00:0'
										+ CAST((CAST(RAND() * 10 AS INT)) % 3 AS CHAR(1))
										+ '.'
										+ CAST(CAST(RAND() * 1000 AS INT) AS CHAR(3))
		,	@Value		NVARCHAR(256)
		,	@Group		NVARCHAR(256)
		,	@Filter		NVARCHAR(256)
		,	@ErrMsg		NVARCHAR(MAX)
		;

	DECLARE	@Return AS TABLE (
				time		DATETIME
			,	metric		NVARCHAR(128)
			,	value		DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (metric, time)
			);

	DECLARE	@Temporary AS TABLE (
				time		DATETIME
			,	metric		NVARCHAR(128)
			,	value		DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (metric, time)
			);

	WAITFOR DELAY @WaitFor;

	SELECT	@Value	=	CASE @Field
							WHEN N'Stake' THEN N'ds.`stake`'
							WHEN N'WinLost' THEN N'ds.`stake` - ds.`payout`'
							WHEN N'Win' THEN N'ds.`stake` - ds.`payout`'
							WHEN N'Lose' THEN N'ds.`payout` - ds.`stake`'
							WHEN N'Ticket' THEN N'ds.`tickets`'
							ELSE NULL
						END
		,	@Group	=	CASE @GroupBy
							WHEN N'Game' THEN N'cfg.`name.en`'
							WHEN N'Currency' THEN N'ds.`currency`'
							WHEN N'Summary' THEN N'"Summary"'
							ELSE NULL
						END
		,	@Filter	=	CASE @Field
							WHEN N'Win' THEN N'WHERE	q.value >= 0'
							WHEN N'Lose' THEN N'WHERE	q.value < 0'
							ELSE N''
						END
		;

	IF	@Value IS NULL OR @Group IS NULL
	BEGIN;
		SELECT	r.time, r.metric, r.value
		FROM	@Return AS r;

		RETURN;
	END;

	IF	@_ReportDate = CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE)
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	time, metric, value
FROM	(
	SELECT	ds.`time` AS time
		,	' + @Group + N' AS metric
		,	SUM(' + @Value + N') AS value
	FROM		summary.game_summary_config AS cfg
	INNER JOIN	summary.daily_summaries AS ds
			ON	ds.gameId = cfg.gameId
	WHERE	ds.currency <> "UUS"
		AND	ds.time = "' + CONVERT(NVARCHAR(MAX), @_ReportDate, 121) + N'"
	GROUP BY ds.`time`, ' + @Group + N'
) AS q
' + @Filter + N'
ORDER BY q.time, q.value DESC;
	';

		IF	@L = 1
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L1_SABABI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L1_SABABI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;

		IF	@L = 2
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L2_SABABI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L2_SABABI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;

		IF	@L = 3
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L3_SABABI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L3_SABABI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;
	END;
	ELSE
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	time, metric, value
FROM	(
	SELECT	ds.`time` AS time
		,	' + @Group + N' AS metric
		,	SUM(' + @Value + N') AS value
	FROM		summary_arc.game_summary_config AS cfg
	INNER JOIN	summary_arc.daily_summaries AS ds
			ON	ds.gameId = cfg.gameId
	WHERE	ds.currency <> "UUS"
		AND	ds.time = "' + CONVERT(NVARCHAR(MAX), @_ReportDate, 121) + N'"
	GROUP BY ds.`time`, ' + @Group + N'
) AS q
' + @Filter + N'
ORDER BY q.time, q.value DESC;
	';

		IF	@L = 1
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L1_SABAARCBI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L1_SABAARCBI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;

		IF	@L = 2
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L2_SABAARCBI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L2_SABAARCBI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;

		IF	@L = 3
		BEGIN TRY;
			DELETE	@Temporary;
			INSERT INTO	@Temporary (time, metric, value)
			EXECUTE	(@Query) AT L3_SABAARCBI;
			MERGE INTO	@Return AS r
			USING	@Temporary AS t
				ON	r.time = t.time
				AND	r.metric = t.metric
			WHEN MATCHED THEN
				UPDATE SET	r.value = r.value + ISNULL(t.value, 0)
			WHEN NOT MATCHED THEN
				INSERT	(time, metric, value)
				VALUES	(t.time, t.metric, ISNULL(t.value, 0))
			;
		END TRY
		BEGIN CATCH
			SELECT	@ErrMsg = N'\
Query from L3_SABAARCBI
	- ' + ERROR_MESSAGE()
			RAISERROR(@ErrMsg, 0, 0) WITH NOWAIT;
		END CATCH;
	END;

	SELECT	r.time, r.metric, r.value
	FROM	@Return AS r
	ORDER BY r.value DESC;
END;
GO
