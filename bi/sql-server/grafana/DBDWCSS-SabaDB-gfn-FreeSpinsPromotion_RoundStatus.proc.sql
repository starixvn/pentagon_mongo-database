USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.FreeSpinsPromotion_RoundStatus') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.FreeSpinsPromotion_RoundStatus AS';
END;
GO
ALTER PROCEDURE	gfn.FreeSpinsPromotion_RoundStatus
					@roundId			INT				= NULL
				,	@showAll			BIT				= 0
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

	WAITFOR DELAY @WaitFor;

	DECLARE	@SpinLogs AS TABLE (
				roundId		INT
			,	memberId	INT
			,	username	NVARCHAR(128)
			,	regDate		DATETIME
			,	joinDate	DATETIME
			,	currency	VARCHAR(10)
			,	spinCnt		INT
			,	exSpinCnt	INT
			,	availSpin	INT
			,	importDate	DATETIME
			,	expiryDate	DATETIME
			,	sCoinWin	INT
			,	sCoinSpin	INT
			,	PRIMARY KEY CLUSTERED (roundId, memberId)
			);

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	rpt.roundId, rpt.memberId, rpt.username, rpt. regDate, rpt.currency, rpt.spinCnt, rpt.exSpinCnt, rpt.availSpin, rpt.importDate, rpt.expiryDate, rpt.sCoinWin, rpt.sCoinSpin, ui.joinedOn
FROM	(
	SELECT	_rpt.roundId, _rpt.memberId
		,	u.memberName AS username
		,	u.regDate AS regDate
		,	u.currency AS currency
		,	_rpt.spinCnt, _rpt.exSpinCnt, _rpt.availSpin, _rpt.importDate, _rpt.expiryDate, _rpt.sCoinWin, _rpt.sCoinSpin
		,	CONVERT(u.uid, CHAR) AS _id
	FROM	(
		SELECT	spl.roundId AS roundId
			,	spl.memberId AS memberId
			,	spl.spinCnt AS spinCnt
			,	esp.spinCnt AS exSpinCnt
			,	spn.availSpins AS availSpin
			,	spl.time AS importDate
			,	spl.expiryDate AS expiryDate
			,	SUM(spr.result) AS sCoinWin
			,	COUNT(spr.result) AS sCoinSpin
		FROM		(
			SELECT	roundId, memberId, spinCnt, time, expiryDate
			FROM	minigame.spin_logs
			WHERE	roundId = ' + LTRIM(ISNULL(@roundId, 0)) + N'
		) AS spl
		LEFT JOIN	minigame.spin_logs AS esp
				ON	spl.roundId = -esp.roundId
				AND	spl.memberId = esp.memberId
		LEFT JOIN	minigame.spins AS spn
				ON	spl.memberId = spn.memberId
		LEFT JOIN	minigame.spin_results AS spr
				ON	spr.memberId = spl.memberId
				AND	spr.time >= spl.time
				AND	spr.time <= spl.expiryDate
		WHERE	spl.roundId = ' + LTRIM(ISNULL(@roundId, 0)) + CASE WHEN @showAll = 0 THEN N'
			AND	spl.spinCnt + IFNULL(esp.spinCnt, -spn.availSpins) > 0' ELSE N'' END + N'
		GROUP BY spl.roundId, spl.memberId
	) AS _rpt
	LEFT JOIN	minigame.users AS u
			ON	_rpt.memberId = u.memberId
			AND	u.clientId = "ONEworks1"' + CASE WHEN @showAll = 0 THEN N'
	WHERE	u.currency IN ("' + REPLACE(ISNULL(@Currencies, N''), ',', '","') + N'")' ELSE N'' END + N'
) AS rpt
LEFT JOIN	minigame.userinfos AS ui
		ON	rpt._id = ui.uid
;
';

	INSERT INTO	@SpinLogs (roundId, memberId, username, regDate, currency, spinCnt, exSpinCnt, availSpin, importDate, expiryDate, sCoinWin, sCoinSpin, joinDate)
	EXECUTE	base.ExecuteSabaQuery @Query, 2, 0;

	SELECT	[Status]			= CASE	WHEN spinCnt > 0 AND exSpinCnt IS NOT NULL
											THEN N'Expired'
										WHEN spinCnt > 0 AND exSpinCnt IS NULL
											THEN N'Active'
										ELSE N'-'
								END
		,	[RoundId]			= roundId
		,	[CustId]			= memberId
		,	[Username]			= ISNULL(username, N'-- ɴᴏᴛ ʀᴇɢɪsᴛᴇʀᴇᴅ --') --ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ
		,	[Registered Time]	= regDate
		,	[Join Time]			= joinDate
		,	[ ]					= CASE	WHEN joinDate BETWEEN importDate AND expiryDate THEN 2
										WHEN regDate BETWEEN importDate AND expiryDate THEN 1
										ELSE 0 END
		,	[$]					= ISNULL(currency, N'')
		,	[Spins]				= spinCnt
		,	[Expired]			= -exSpinCnt
		,	[Used]				= spinCnt + ISNULL(exSpinCnt, -availSpin)
		,	[sᴄᴏɪɴ Spun]		= sCoinWin
		,	[Imported Time]		= importDate
		,	[Expired Time]		= expiryDate
		,	[Verify]			= CASE WHEN spinCnt + ISNULL(exSpinCnt, -availSpin) = sCoinSpin THEN 1 ELSE 0 END
	FROM	@SpinLogs
	ORDER BY sCoinWin DESC, [ ] DESC, joinDate DESC, regDate DESC, spinCnt DESC
END;
GO
EXECUTE	gfn.FreeSpinsPromotion_RoundStatus @RoundId = 6, @Currencies = N'INH,UUS', @showAll = 0
