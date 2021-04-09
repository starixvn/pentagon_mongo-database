USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.FreeSpinsPromotion_Agg') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.FreeSpinsPromotion_Agg AS';
END;
GO
ALTER PROCEDURE	gfn.FreeSpinsPromotion_Agg
					@Type				INT
				,	@RoundId			INT				= NULL
				,	@Currencies			NVARCHAR(MAX)	= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query		NVARCHAR(MAX)
		,	@WaitFor	VARCHAR(16)		= '00:00:0'
										+ CAST(ABS(CHECKSUM(NEWID())) % 3 AS CHAR(1))
										+ '.'
										+ CAST(ABS(CHECKSUM(NEWID())) % 1000 AS CHAR(3))
		,	@Yesterday	DATETIME		= CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE)
		;

	DECLARE	@RoundDate AS TABLE (
				fromDate		DATETIME
			,	toDate			DATETIME
			);

	DECLARE	@SpinLogs AS TABLE (
				memberId		INT
			,	spinCnt			INT
			,	PRIMARY KEY CLUSTERED (memberId, spinCnt)
			);

	DECLARE	@Result AS TABLE (
				metric			NVARCHAR(128)
			,	value			SQL_VARIANT
			);

	WAITFOR DELAY @WaitFor;

	-- RoundId --
	IF	@Type = 1
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	"Round" AS `metric`
	,	roundId AS `value`
FROM	minigame.spin_logs
WHERE	roundId = ' + LTRIM(@RoundId) + '
LIMIT 1
';

		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total given spins
	IF	@Type = 2
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	"Given sᴘɪɴ" AS `metric`
	,	SUM(spinCnt) AS `value`
FROM		minigame.spin_logs AS sl
LEFT JOIN	minigame.users AS u
		ON	sl.memberId = u.`local.memberId`
WHERE	sl.roundId = ' + LTRIM(@RoundId) + '
	AND	(	u.`local.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'")
		OR	u.`local.currency` IS NULL
		);
';
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total used spins
	IF	@Type = 3
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	MIN(sl.time), MAX(sl.expiryDate)
FROM	minigame.spin_logs AS sl
WHERE	sl.roundId = ' + LTRIM(@RoundId) + ';
';

		INSERT INTO @RoundDate (fromDate, toDate)
		EXECUTE	(@Query) AT L2_SABABI;

		SELECT	@Query = N'';
		SELECT	TOP(1)
				@Query += N'\
SELECT	"Used sᴘɪɴ" AS `metric`
	,	COUNT(1) AS `value`
FROM		minigame.spin_results AS sr
INNER JOIN	minigame.users AS u
		ON	sr.memberId = u.`local.memberId`
WHERE	sr.time >= "' + CONVERT(NVARCHAR(MAX), fromDate, 121) + N'"
	AND	sr.time <= "' + CONVERT(NVARCHAR(MAX), toDate, 121) + N'"
	AND	u.`local.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
'
		FROM	@RoundDate;

		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total scoin spun
	IF	@Type = 4
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	MIN(sl.time), MAX(sl.expiryDate)
FROM	minigame.spin_logs AS sl
WHERE	sl.roundId = ' + LTRIM(@RoundId) + ';
';

		INSERT INTO @RoundDate (fromDate, toDate)
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

		SELECT	@Query = N'';
		SELECT	TOP(1)
				@Query += N'\
SELECT	"Spun sᴄᴏɪɴ" AS `metric`
	,	SUM(result) AS `value`
FROM		minigame.spin_results AS sr
INNER JOIN	minigame.users AS u
		ON	sr.memberId = u.`local.memberId`
WHERE	sr.time >= "' + CONVERT(NVARCHAR(MAX), fromDate, 121) + N'"
	AND	sr.time <= "' + CONVERT(NVARCHAR(MAX), toDate, 121) + N'"
	AND	u.`local.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
'
		FROM	@RoundDate;

		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total scoin stake
	IF	@Type = 5
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	MIN(time), MAX(expiryDate)
FROM	minigame.spin_logs
WHERE	roundId = ' + LTRIM(@RoundId) + ';
';

		INSERT INTO @RoundDate (fromDate, toDate)
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

		SELECT	@Query = N'';
		SELECT	TOP(1)
				@Query += N'\
SELECT	"Stake sᴄᴏɪɴ" AS `metric`
	,	SUM(b.odd + b.even + b.red3 + b.red4 + b.white3 + b.white4) AS `value`
FROM		minigame.xocxoc_cuocs AS b
INNER JOIN	minigame.users AS u
		ON	b.memberId = u.`local.memberId`
WHERE	b.freeBet = true
	AND	b.memberId > 0
	AND	b.time >= "' + CONVERT(NVARCHAR(MAX), fromDate, 121) + N'"
	AND	b.time <= "' + CONVERT(NVARCHAR(MAX), toDate, 121) + N'"
	AND	u.`local.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
'
		FROM	@RoundDate;

		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total company winloss
	IF	@Type = 6
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	MIN(time), MAX(expiryDate)
FROM	minigame.spin_logs
WHERE	roundId = ' + LTRIM(@RoundId) + ';
';

		INSERT INTO @RoundDate (fromDate, toDate)
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

		SELECT	@Query = N'';
		SELECT	TOP(1)
				@Query += N'\
SELECT	"Company WinLoss" AS `metric`
	,	SUM(-b.betwin) AS `value`
FROM		minigame.xocxoc_cuocs AS b
INNER JOIN	minigame.users AS u
		ON	b.memberId = u.`local.memberId`
WHERE	b.freeBet = true
	AND	b.memberId > 0
	AND	b.time > "' + CONVERT(NVARCHAR(MAX), d.fromDate, 121) + N'"
	AND	b.time <= "' + CONVERT(NVARCHAR(MAX), d.toDate, 121) + N'"
	AND	u.`local.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
'
		FROM	@RoundDate AS tmp
		CROSS APPLY	(
			SELECT	[fromDate]	= CASE WHEN tmp.fromDate < @Yesterday THEN @Yesterday ELSE tmp.fromDate END
				,	[toDate]	= CASE WHEN tmp.toDate < @Yesterday THEN @Yesterday ELSE tmp.toDate END
		) AS d;

		INSERT INTO	@Result (metric, value)
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

		SELECT	@Query = N'';
		SELECT	TOP(1)
				@Query += N'\
SELECT	"Company WinLoss" AS `metric`
	,	SUM(-b.betwin) AS `value`
FROM	minigame_arc.xocxoc_cuocs_bk AS b
WHERE	b.freeBet = true
	AND	b.memberId > 0
	AND	b.time > "' + CONVERT(NVARCHAR(MAX), d.fromDate, 121) + N'"
	AND	b.time <= "' + CONVERT(NVARCHAR(MAX), d.toDate, 121) + N'"
	AND	b.`__archive.currency` IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
'
		FROM	@RoundDate AS tmp
		CROSS APPLY	(
			SELECT	[fromDate]	= CASE WHEN tmp.fromDate > @Yesterday THEN @Yesterday ELSE tmp.fromDate END
				,	[toDate]	= CASE WHEN tmp.toDate > @Yesterday THEN @Yesterday ELSE tmp.toDate END
		) AS d;

		INSERT INTO	@Result (metric, value)
		EXECUTE	(@Query) AT L2_SABAARCBI;

		SELECT	[metric]	= metric
			,	[value]		= SUM(CAST(value AS MONEY))
		FROM	@Result
		GROUP BY metric;
	END;

	-- Round Start
	IF	@Type = 7
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	"Start" AS `metric`
	,	UNIX_TIMESTAMP(MIN(time)) * 1000 AS `value`
FROM	minigame.spin_logs
WHERE	roundId = ' + LTRIM(@RoundId) + ';
';
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Round End
	IF	@Type = 8
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	"End" AS `metric`
	,	UNIX_TIMESTAMP(MAX(expiryDate)) * 1000 AS `value`
FROM	minigame.spin_logs
WHERE	roundId = ' + LTRIM(@RoundId) + ';
';
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- Total given users
	IF	@Type = 9
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	"Total ᴜsᴇʀ" AS `metric`
	,	COUNT(1) AS `value`
FROM		minigame.spin_logs AS sl
LEFT JOIN	minigame.users AS u
		ON	sl.memberId = u.`local.memberId`
WHERE	sl.roundId = ' + LTRIM(@RoundId) + ';
';
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;

	-- User groups
	IF	@Type = 10
	BEGIN;
		IF	@RoundId IS NULL
		BEGIN;
			RAISERROR(N'Invalid Input!', 16, 1) WITH NOWAIT;
			RETURN;
		END;

		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	IFNULL(u.`local.currency`, "-- ɴᴏᴛ ʀᴇɢɪsᴛᴇʀᴇᴅ --") AS metric
	,	COUNT(1) AS value
FROM		minigame.spin_logs AS sl
LEFT JOIN	minigame.users AS u
		ON	sl.memberId = u.`local.memberId`
WHERE	sl.roundId = ' + LTRIM(@RoundId) + '
GROUP BY u.`local.currency`
ORDER BY 2 DESC
;';
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
	END;
END;
GO
EXECUTE	gfn.FreeSpinsPromotion_Agg 6, 3, "INH,UUS"
