/*
	Creator:	20200420@Billy
	Task:		Compare Daily Summary - [Gitlab: #17]
	Server:		DBDWCSS
*/


SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

DECLARE	@ReportDate	DATETIME	= '2020-08-17'

BEGIN;
	-- Constant
	DECLARE	@VendorId	INT				= 42
		;

	DECLARE	@OW_Query	NVARCHAR(MAX)
		,	@OW_Param	NVARCHAR(MAX)
		,	@SB_Query	NVARCHAR(MAX)
		,	@SB_Games	NVARCHAR(MAX)
		,	@SB_Execute	NVARCHAR(MAX)
		,	@DS_Query	NVARCHAR(MAX)
		;

	DECLARE	@Tmp_DailySummary AS TABLE (
				gameTypeId		INT
			,	currency		VARCHAR(10)
			,	phienCount		INT
			,	betCount		INT
			,	stake			DECIMAL(19,4)
			,	winLost			DECIMAL(19,4)
			,	payOut			DECIMAL(19,4)
			,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
			);
	DECLARE	@Tmp_Games AS TABLE (
				gameType		NVARCHAR(128)
			,	hasMember		BIT
			);

	CREATE TABLE	#OW_DailySummary (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	winLost			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#SB_DailySummary (
						gameTypeId		INT
					,	currency		VARCHAR(10)
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	winLost			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);

	CREATE TABLE	#DS_DailySummary (
						gameTypeId		INT
					,	currency		VARCHAR(10)
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	payOut			DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (gameTypeId, currency)
					);


	CREATE TABLE	#SB_Template (
						gameType		NVARCHAR(128)
					,	hasMember		BIT
					,	query			NVARCHAR(MAX)
					,	PRIMARY KEY CLUSTERED (gameType, hasMember)
					);

	-- SB Query Template --
	BEGIN;
		INSERT INTO	#SB_Template (gameType, hasMember, query)
		VALUES	(N'taixiu', 1, N'
UNION
SELECT	1612 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.taixiu_phiens AS g
LEFT JOIN	minigame.taixiu_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'taixiu', 0, N'
UNION
SELECT	1612 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.taixiu_phiens AS g
LEFT JOIN	minigame.taixiu_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'xocxoc', 1, N'
UNION
SELECT	1613 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4) AS stake
	,	SUM(b.betwin - (b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4)) AS winLost
FROM		minigame.xocxoc_phiens AS g
LEFT JOIN	minigame.xocxoc_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'xocxoc', 0, N'
UNION
SELECT	1613 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4) AS stake
	,	SUM(b.betwin - (b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4)) AS winLost
FROM		minigame.xocxoc_phiens AS g
LEFT JOIN	minigame.xocxoc_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'baucua', 1, N'
UNION
SELECT	1614 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`) AS stake
	,	SUM(b.betwin - (b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`)) AS winLost
FROM		minigame.baucua_phiens AS g
LEFT JOIN	minigame.baucua_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'baucua', 0, N'
UNION
SELECT	1614 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`) AS stake
	,	SUM(b.betwin - (b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`)) AS winLost
FROM		minigame.baucua_phiens AS g
LEFT JOIN	minigame.baucua_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'txturbo', 1, N'
UNION
SELECT	1615 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.txturbo_phiens AS g
LEFT JOIN	minigame.txturbo_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'txturbo', 0, N'
UNION
SELECT	1615 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.txturbo_phiens AS g
LEFT JOIN	minigame.txturbo_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'chanle', 1, N'
UNION
SELECT	1616 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanle_phiens AS g
LEFT JOIN	minigame.chanle_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'chanle', 0, N'
UNION
SELECT	1616 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanle_phiens AS g
LEFT JOIN	minigame.chanle_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'chanleturbo', 1, N'
UNION
SELECT	1617 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanleturbo_phiens AS g
LEFT JOIN	minigame.chanleturbo_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'chanleturbo', 0, N'
UNION
SELECT	1617 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanleturbo_phiens AS g
LEFT JOIN	minigame.chanleturbo_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'minidragontiger', 1, N'
UNION
SELECT	1618 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.dragon + b.tie + b.tiger) AS stake
	,	SUM(b.betwin - (b.dragon + b.tie + b.tiger)) AS winLost
FROM		minigame.minidragontiger_phiens AS g
LEFT JOIN	minigame.minidragontiger_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'minidragontiger', 0, N'
UNION
SELECT	1618 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.dragon + b.tie + b.tiger) AS stake
	,	SUM(b.betwin - (b.dragon + b.tie + b.tiger)) AS winLost
FROM		minigame.minidragontiger_phiens AS g
LEFT JOIN	minigame.minidragontiger_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenopromax', 1, N'
UNION
SELECT	1619 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenopromax_phiens AS g
LEFT JOIN	minigame.kenopromax_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenopromax', 0, N'
UNION
SELECT	1619 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenopromax_phiens AS g
LEFT JOIN	minigame.kenopromax_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'minisedie', 1, N'
UNION
SELECT	1620 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.even + b.odd + b.red3 + b.red4 + b.white3 + b.white4) AS stake
	,	SUM(b.betwin - (b.even + b.odd + b.red3 + b.red4 + b.white3 + b.white4)) AS winLost
FROM		minigame.minisedie_phiens AS g
LEFT JOIN	minigame.minisedie_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'minisedie', 0, N'
UNION
SELECT	1620 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.even + b.odd + b.red3 + b.red4 + b.white3 + b.white4) AS stake
	,	SUM(b.betwin - (b.even + b.odd + b.red3 + b.red4 + b.white3 + b.white4)) AS winLost
FROM		minigame.minisedie_phiens AS g
LEFT JOIN	minigame.minisedie_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'baccarat', 1, N'
UNION
SELECT	1621 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.banker + b.bankerPair + b.player + b.playerPair + b.tie + b.big + b.small) AS stake
	,	SUM(b.betwin - (b.banker + b.bankerPair + b.player + b.playerPair + b.tie + b.big + b.small)) AS winLost
FROM		minigame.baccarat_phiens AS g
LEFT JOIN	minigame.baccarat_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'baccarat', 0, N'
UNION
SELECT	1621 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.banker + b.bankerPair + b.player + b.playerPair + b.tie + b.big + b.small) AS stake
	,	SUM(b.betwin - (b.banker + b.bankerPair + b.player + b.playerPair + b.tie + b.big + b.small)) AS winLost
FROM		minigame.baccarat_phiens AS g
LEFT JOIN	minigame.baccarat_cuocs AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenoproviet', 1, N'
UNION
SELECT	1622 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenoproviet_phiens AS g
LEFT JOIN	minigame.kenoproviet_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenoproviet', 0, N'
UNION
SELECT	1622 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenoproviet_phiens AS g
LEFT JOIN	minigame.kenoproviet_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomax', 1, N'
UNION
SELECT	1623 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomax_phiens AS g
LEFT JOIN	minigame.kenomax_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomax', 0, N'
UNION
SELECT	1623 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomax_phiens AS g
LEFT JOIN	minigame.kenomax_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomax2', 1, N'
UNION
SELECT	1624 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomax2_phiens AS g
LEFT JOIN	minigame.kenomax2_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomax2', 0, N'
UNION
SELECT	1624 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomax2_phiens AS g
LEFT JOIN	minigame.kenomax2_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomini', 1, N'
UNION
SELECT	1625 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomini_phiens AS g
LEFT JOIN	minigame.kenomini_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomini', 0, N'
UNION
SELECT	1625 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomini_phiens AS g
LEFT JOIN	minigame.kenomini_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomini2', 1, N'
UNION
SELECT	1626 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomini2_phiens AS g
LEFT JOIN	minigame.kenomini2_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenomini2', 0, N'
UNION
SELECT	1626 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenomini2_phiens AS g
LEFT JOIN	minigame.kenomini2_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenoeast', 1, N'
UNION
SELECT	1627 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenoeast_phiens AS g
LEFT JOIN	minigame.kenoeast_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenoeast', 0, N'
UNION
SELECT	1627 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenoeast_phiens AS g
LEFT JOIN	minigame.kenoeast_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenowest', 1, N'
UNION
SELECT	1628 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenowest_phiens AS g
LEFT JOIN	minigame.kenowest_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenowest', 0, N'
UNION
SELECT	1628 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenowest_phiens AS g
LEFT JOIN	minigame.kenowest_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenosouth', 1, N'
UNION
SELECT	1629 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenosouth_phiens AS g
LEFT JOIN	minigame.kenosouth_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenosouth', 0, N'
UNION
SELECT	1629 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenosouth_phiens AS g
LEFT JOIN	minigame.kenosouth_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenonorth', 1, N'
UNION
SELECT	1630 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenonorth_phiens AS g
LEFT JOIN	minigame.kenonorth_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'kenonorth', 0, N'
UNION
SELECT	1630 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth) AS stake
	,	SUM(b.betwin - (b.big + b.small + b.even + b.odd + b.gold + b.wood + b.fire + b.water + b.earth)) AS winLost
FROM		minigame.kenonorth_phiens AS g
LEFT JOIN	minigame.kenonorth_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'bolatangkas', 1, N'
UNION
SELECT	1631 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT r.id) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(r.totalBet) AS stake
	,	SUM(r.win - (r.totalBet)) AS winLost
FROM		minigame.bolatangkas_rounds AS r
LEFT JOIN	minigame.userinfos AS u
		ON	r.uid = u.id
WHERE	r.startTime >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	r.startTime < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	r.settled = true
	AND	r.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'bolatangkas', 0, N'
UNION
SELECT	1631 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT r.id) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(r.totalBet) AS stake
	,	SUM(r.win - (r.totalBet)) AS winLost
FROM		minigame.bolatangkas_rounds AS r
LEFT JOIN	minigame.userinfos AS u
		ON	r.uid = u.id
WHERE	r.startTime >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	r.startTime < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	r.settled = true
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'roulette', 1, N'
UNION
SELECT	1632 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.totalAmount) AS stake
	,	SUM(b.betwin - (b.totalAmount)) AS winLost
FROM		minigame.roulette_phiens AS g
LEFT JOIN	minigame.roulette_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	b.memberId > 0
	AND	u.type = 0
GROUP BY u.currency')
			,	(N'roulette', 0, N'
UNION
SELECT	1632 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.totalAmount) AS stake
	,	SUM(b.betwin - (b.totalAmount)) AS winLost
FROM		minigame.roulette_phiens AS g
LEFT JOIN	minigame.roulette_ones AS b
		ON	g.id = b.phien
LEFT JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency')
	END;

	-- OW Query --
	BEGIN;
		SELECT	@OW_Query = N'';
		SELECT	@OW_Query += N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	[gameTypeId]	= b.gameId
	,	[gameType]		= g.typenamee
	,	[currency]		= b.CurrencyName
	,	[phienCount]	= COUNT(DISTINCT b.GameId3rd)
	,	[betCount]		= COUNT(1)
	,	[stake]			= SUM(b.stake)
	,	[winLost]		= SUM(b.winlost - b.stake)
	,	[payOut]		= SUM(b.winlost)
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
WHERE	b.vendorID = @VendorId
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID <> 101 --Reject
	AND	b.custid <> 0 -- Merged Tickets
GROUP BY b.gameId, g.typenamee, b.CurrencyName
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_DailySummary (gameTypeId, gameType, currency, phienCount, betCount, stake, winLost, payOut)
		EXECUTE	DB06KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @ReportDate;

		RAISERROR('', 0, 0) WITH NOWAIT;
	END;

	-- SB Query --
	BEGIN;
		SELECT	@SB_Games = N'';
		SELECT	@SB_Games += N'\
SELECT	REPLACE(REPLACE(REPLACE(tbl.TABLE_NAME, "_cuocs", ""), "_ones", ""), "_rounds", "") AS gameType
	,	MIN(CASE WHEN col.COLUMN_NAME IS NULL THEN 0 ELSE 1 END) AS hasMember
FROM		INFORMATION_SCHEMA.TABLES AS tbl
LEFT JOIN	INFORMATION_SCHEMA.COLUMNS AS col
		ON	tbl.TABLE_NAME = col.TABLE_NAME
		AND	col.COLUMN_NAME = "memberId"
WHERE	(tbl.TABLE_NAME LIKE "%\_cuocs" OR tbl.TABLE_NAME LIKE "%\_ones" OR tbl.TABLE_NAME LIKE "%\_rounds")
GROUP BY REPLACE(REPLACE(REPLACE(tbl.TABLE_NAME, "_cuocs", ""), "_ones", ""), "_rounds", "")
';

		SELECT	@SB_Query = N'';
		SELECT	@SB_Query += N'\
SELECT	0 AS gameTypeId
	,	"" AS currency
	,	0 AS phienCount
	,	0 AS betCount
	,	1E-10 AS stake
	,	1E-10 AS winLost
LIMIT 0';

		-- L1
		BEGIN;
			DELETE	@Tmp_Games;
			INSERT INTO	@Tmp_Games (gameType, hasMember)
			EXECUTE	(@SB_Games) AT L1_SABABI;

			SELECT	@SB_Execute = @SB_Query + qs.str
			FROM	(
				SELECT	tmp.query + ''
				FROM		#SB_Template AS tmp
				INNER JOIN	@Tmp_Games AS g
						ON	tmp.gameType = g.gameType
						AND	tmp.hasMember = g.hasMember
				FOR XML PATH ('')
				,	TYPE
			) AS xq(xml)
			CROSS APPLY (
				SELECT	xq.xml.value('.', 'NVARCHAR(MAX)')
			) AS qs(str);

			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, phienCount, betCount, stake, winLost)
			EXECUTE	(@SB_Execute) AT L1_SABABI;

			MERGE INTO	#SB_DailySummary AS sb
			USING		@Tmp_DailySummary AS tmp
					ON	sb.gameTypeId = tmp.gameTypeId
					AND	sb.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	sb.phienCount += tmp.phienCount
				,	sb.betCount += tmp.betCount
				,	sb.stake += tmp.stake
				,	sb.winLost += tmp.winLost
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     phienCount,     betCount,     stake,     winLost)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.phienCount, tmp.betCount, tmp.stake, tmp.winLost)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L2
		BEGIN;
			DELETE	@Tmp_Games;
			INSERT INTO	@Tmp_Games (gameType, hasMember)
			EXECUTE	(@SB_Games) AT L2_SABABI;

			SELECT	@SB_Execute = @SB_Query + qs.str
			FROM	(
				SELECT	tmp.query + ''
				FROM		#SB_Template AS tmp
				INNER JOIN	@Tmp_Games AS g
						ON	tmp.gameType = g.gameType
						AND	tmp.hasMember = g.hasMember
				FOR XML PATH ('')
				,	TYPE
			) AS xq(xml)
			CROSS APPLY (
				SELECT	xq.xml.value('.', 'NVARCHAR(MAX)')
			) AS qs(str);

			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, phienCount, betCount, stake, winLost)
			EXECUTE	(@SB_Execute) AT L2_SABABI;

			MERGE INTO	#SB_DailySummary AS sb
			USING		@Tmp_DailySummary AS tmp
					ON	sb.gameTypeId = tmp.gameTypeId
					AND	sb.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	sb.phienCount += tmp.phienCount
				,	sb.betCount += tmp.betCount
				,	sb.stake += tmp.stake
				,	sb.winLost += tmp.winLost
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     phienCount,     betCount,     stake,     winLost)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.phienCount, tmp.betCount, tmp.stake, tmp.winLost)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L3
		BEGIN;
			DELETE	@Tmp_Games;
			INSERT INTO	@Tmp_Games (gameType, hasMember)
			EXECUTE	(@SB_Games) AT L3_SABABI;

			SELECT	@SB_Execute = @SB_Query + qs.str
			FROM	(
				SELECT	tmp.query + ''
				FROM		#SB_Template AS tmp
				INNER JOIN	@Tmp_Games AS g
						ON	tmp.gameType = g.gameType
						AND	tmp.hasMember = g.hasMember
				FOR XML PATH ('')
				,	TYPE
			) AS xq(xml)
			CROSS APPLY (
				SELECT	xq.xml.value('.', 'NVARCHAR(MAX)')
			) AS qs(str);

			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, phienCount, betCount, stake, winLost)
			EXECUTE	(@SB_Execute) AT L3_SABABI;

			MERGE INTO	#SB_DailySummary AS sb
			USING		@Tmp_DailySummary AS tmp
					ON	sb.gameTypeId = tmp.gameTypeId
					AND	sb.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	sb.phienCount += tmp.phienCount
				,	sb.betCount += tmp.betCount
				,	sb.stake += tmp.stake
				,	sb.winLost += tmp.winLost
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     phienCount,     betCount,     stake,     winLost)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.phienCount, tmp.betCount, tmp.stake, tmp.winLost)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;
	END;

	-- DS Query --
	BEGIN;
		SELECT	@DS_Query = N'';
		SELECT	@DS_Query += N'\
SELECT	cfg.owGameTypeId AS gameTypeId
	,	ds.currency AS currency
	,	ds.tickets AS betCount
	,	ds.stake AS stake
	,	ds.payOut AS payOut
FROM		summary.daily_summaries AS ds
INNER JOIN	summary.game_summary_config AS cfg
		ON	ds.gameId = cfg.gameId
WHERE	ds.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	ds.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
';

		-- L1
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L1_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     betCount,     stake,     payOut)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L2
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L2_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     betCount,     stake,     payOut)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;

		-- L3
		BEGIN;
			DELETE	@Tmp_DailySummary;
			INSERT INTO	@Tmp_DailySummary (gameTypeId, currency, betCount, stake, payOut)
			EXECUTE	(@DS_Query) AT L3_SABABI;

			MERGE INTO	#DS_DailySummary AS ds
			USING		@Tmp_DailySummary AS tmp
					ON	ds.gameTypeId = tmp.gameTypeId
					AND	ds.currency = tmp.currency
			WHEN MATCHED THEN
				UPDATE
				SET	ds.betCount += tmp.betCount
				,	ds.stake += tmp.stake
				,	ds.payOut += tmp.payOut
			WHEN NOT MATCHED THEN
				INSERT	(    gameTypeId,     currency,     betCount,     stake,     payOut)
				VALUES	(tmp.gameTypeId, tmp.currency, tmp.betCount, tmp.stake, tmp.payOut)
			;
			RAISERROR('', 0, 0) WITH NOWAIT;
		END;
	END;

	SELECT	ow.*
		,	[<= OW] = ''
		,	[SB =>] = ''
		,	sb.*
		,	[||] = '||'
		,	[phien]		= CASE WHEN ow.phienCount = sb.phienCount THEN '   OK   ' ELSE '---NG---' END
		,	[bet]		= CASE WHEN ow.betCount = sb.betCount THEN '   OK   ' ELSE '---NG---' END
		,	[stake]		= CASE WHEN ow.stake = sb.stake THEN '   OK   ' ELSE '---NG---' END
		,	[winLost]	= CASE WHEN ow.winLost = sb.winLost THEN '   OK   ' ELSE '---NG---' END
		,	[||] = '||'
		,	[phien]		= CASE WHEN ow.phienCount = sb.phienCount THEN '' ELSE CAST(sb.phienCount - ow.phienCount AS VARCHAR) END
		,	[bet]		= CASE WHEN ow.betCount = sb.betCount THEN '' ELSE CAST(sb.betCount - ow.betCount AS VARCHAR) END
		,	[stake]		= CASE WHEN ow.stake = sb.stake THEN '' ELSE CAST(sb.stake - ow.stake AS VARCHAR) END
		,	[winLost]	= CASE WHEN ow.winLost = sb.winLost THEN '' ELSE CAST(sb.winLost - ow.winLost AS VARCHAR) END
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#SB_DailySummary AS sb
				ON	ow.gameTypeId = sb.gameTypeId
				AND	ow.currency = sb.currency
	WHERE	ISNULL(ow.currency, sb.currency) <> 'UUS'
	ORDER BY CASE WHEN ISNULL(ow.currency, sb.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, sb.gameTypeId, ow.currency, sb.currency;

	SELECT	ow.*
		,	[<= OW] = ''
		,	[DS =>] = ''
		,	ds.*
		,	[||] = '||'
		,	[bet]		= CASE WHEN ow.betCount = ds.betCount THEN '   OK   ' ELSE '---NG---' END
		,	[stake]		= CASE WHEN ow.stake = ds.stake THEN '   OK   ' ELSE '---NG---' END
		,	[winLost]	= CASE WHEN ow.payOut = ds.payOut THEN '   OK   ' ELSE '---NG---' END
		,	[||] = '||'
		,	[bet]		= CASE WHEN ow.betCount = ds.betCount THEN '' ELSE CAST(ds.betCount - ow.betCount AS VARCHAR(MAX)) END
		,	[stake]		= CASE WHEN ow.stake = ds.stake THEN '' ELSE CAST(ds.stake - ow.stake AS VARCHAR(MAX)) END
		,	[winLost]	= CASE WHEN ow.payOut = ds.payOut THEN '' ELSE CAST(ds.payOut - ow.payOut AS VARCHAR(MAX)) END
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#DS_DailySummary AS ds
				ON	ow.gameTypeId = ds.gameTypeId
				AND	ow.currency = ds.currency
	WHERE	ISNULL(ow.currency, ds.currency) <> 'UUS'
	ORDER BY CASE WHEN ISNULL(ow.currency, ds.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, ds.gameTypeId, ow.currency, ds.currency;

	SELECT	[OW =>] = ''
		,	ow.*
		,	[||] = '||'
		,	[SB =>] = ''
		,	sb.*
		,	[||] = '||'
		,	[DS =>] = ''
		,	ds.*
		,	[||] = '||'
		,	[bet]		= CASE	WHEN ow.betCount = sb.betCount AND ow.betCount = ds.betCount THEN '   OK   '
								WHEN ow.betCount = sb.betCount AND ow.betCount <> ds.betCount THEN '---DS---'
								WHEN ow.betCount <> sb.betCount AND ow.betCount = ds.betCount THEN '---SB---'
								ELSE '---NG---' END
		,	[stake]		= CASE	WHEN ow.stake = sb.stake AND ow.stake = ds.stake THEN '   OK   '
								WHEN ow.stake = sb.stake AND ow.stake <> ds.stake THEN '---DS---'
								WHEN ow.stake <> sb.stake AND ow.stake = ds.stake THEN '---SB---'
								ELSE '---NG---' END
		,	[winLost]	= CASE	WHEN ow.winLost = sb.winLost AND ow.payOut = ds.payOut THEN '   OK   '
								WHEN ow.winLost = sb.winLost AND ow.payOut <> ds.payOut THEN '---DS---'
								WHEN ow.winLost <> sb.winLost AND ow.payOut = ds.payOut THEN '---SB---'
								ELSE '---NG---' END
		--,	[||] = '||'
		--,	[bet]		= CASE WHEN ow.betCount = sb.betCount THEN '' ELSE CAST(sb.betCount - ow.betCount AS VARCHAR) END
		--,	[stake]		= CASE WHEN ow.stake = sb.stake THEN '' ELSE CAST(sb.stake - ow.stake AS VARCHAR) END
		--,	[winLost]	= CASE WHEN ow.winLost = sb.winLost THEN '' ELSE CAST(sb.winLost - ow.winLost AS VARCHAR) END
	FROM	(
		SELECT	[currency]	= _ow.currency
			,	[betCount]	= SUM(_ow.betCount)
			,	[stake]		= SUM(_ow.stake)
			,	[winLost]	= SUM(_ow.winLost)
			,	[payOut]	= SUM(_ow.payOut)
		FROM	#OW_DailySummary AS _ow WITH (NOLOCK)
		GROUP BY _ow.currency
	) AS ow
	FULL OUTER JOIN	(
		SELECT	[currency]	= _sb.currency
			,	[betCount]	= SUM(_sb.betCount)
			,	[stake]		= SUM(_sb.stake)
			,	[winLost]	= SUM(_sb.winLost)
		FROM	#SB_DailySummary AS _sb WITH (NOLOCK)
		GROUP BY _sb.currency
	) AS sb
				ON	ow.currency = sb.currency
	FULL OUTER JOIN	(
		SELECT	[currency]	= _ds.currency
			,	[betCount]	= SUM(_ds.betCount)
			,	[stake]		= SUM(_ds.stake)
			,	[payOut]	= SUM(_ds.payOut)
		FROM	#DS_DailySummary AS _ds WITH (NOLOCK)
		GROUP BY _ds.currency
	) AS ds
				ON	ow.currency = ds.currency
				OR	sb.currency = ds.currency
	WHERE	COALESCE(ow.currency, sb.currency, ds.currency) <> 'UUS'


	DROP TABLE	#OW_DailySummary;
	DROP TABLE	#SB_DailySummary;
	DROP TABLE	#DS_DailySummary;
	DROP TABLE	#SB_Template;
END;
GO