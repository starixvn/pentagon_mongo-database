USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.GetFreeSpinRounds') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.GetFreeSpinRounds AS';
END;
GO
ALTER PROCEDURE	gfn.GetFreeSpinRounds
					@fromDate			DATETIME		= NULL
				,	@toDate				DATETIME		= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query			NVARCHAR(MAX)
		;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	DISTINCT
		roundId
FROM	minigame.spin_logs
WHERE	roundId > 0
	AND	time >= "' + CONVERT(NVARCHAR(MAX), ISNULL(@fromDate, 0), 120) + N'"
	AND	time <= "' + CONVERT(NVARCHAR(MAX), ISNULL(@toDate, GETUTCDATE()), 120) + N'"
';

	EXECUTE	(@Query) AT L2_SABABI;
END;
GO
EXECUTE	gfn.GetFreeSpinRounds
