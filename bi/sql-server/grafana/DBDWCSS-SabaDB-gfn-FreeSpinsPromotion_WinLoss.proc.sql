USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.FreeSpinsPromotion_WinLoss') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.FreeSpinsPromotion_WinLoss AS';
END;
GO
ALTER PROCEDURE	gfn.FreeSpinsPromotion_WinLoss
					@roundId			INT				= NULL
				,	@fromDate			DATETIME		= NULL
				,	@toDate				DATETIME		= NULL
				,	@Currencies			NVARCHAR(MAX)	= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query		NVARCHAR(MAX)
		,	@WaitFor	VARCHAR(16)		= '00:00:0'
										+ CAST(ABS(CHECKSUM(NEWID())) % 2 AS CHAR(1))
										+ '.'
										+ CAST(ABS(CHECKSUM(NEWID())) % 1000 AS CHAR(3))
		;

	DECLARE	@RoundTime AS TABLE (
				importDate		DATETIME2
			);

	WAITFOR DELAY @WaitFor;

	IF	@roundId > 0
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	MIN(sl.time)
FROM	minigame.spin_logs AS sl
WHERE	sl.roundId = ' + LTRIM(@roundId) + N'
';

		INSERT INTO	@RoundTime (importDate)
		EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

		SELECT	TOP(1)
				@fromDate = importDate
		FROM	@RoundTime;
	END;

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	b.memberId AS CustId
	,	u.memberName AS Username
	,	ui.nickname AS Nickname
	,	u.currency AS `$`
	,	ui.scoins AS `Available sᴄᴏɪɴ`
	,	SUM(b.stake) AS `Stake sᴄᴏɪɴ`
	,	SUM(-b.payout) AS WinLoss
FROM		minigame.xocxoc_tickets AS b
LEFT JOIN	minigame.userinfos AS ui
		ON	b.uid = ui.uid
LEFT JOIN	minigame.users AS u
		ON	b.memberId = u.memberId
WHERE	b.freeBet = true
	AND	b.memberId > 0
	AND	b.time >= "' + CONVERT(NVARCHAR(MAX), ISNULL(@fromDate, 0), 120) + N'"
	AND	b.time <= "' + CONVERT(NVARCHAR(MAX), ISNULL(@toDate, GETUTCDATE()), 120) + N'"
	AND	u.currency IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'");
GROUP BY b.memberId
ORDER BY WinLoss ASC, `Available sᴄᴏɪɴ` DESC
';

	EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;
END;
GO
EXECUTE	gfn.FreeSpinsPromotion_WinLoss
