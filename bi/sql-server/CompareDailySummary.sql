/*
	Creator:	20200420@Billy
	Task:		Compare Daily Summary - [Gitlab: #17]
	Server:		DBDWCSS
*/


SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

DECLARE	@ReportDate	DATETIME	= '2020-05-02'

BEGIN;
	-- Constant
	DECLARE	@VendorId	INT				= 42
		;

	DECLARE	@OW_Query	NVARCHAR(MAX)
		,	@OW_Param	NVARCHAR(MAX)
		,	@SB_Query	NVARCHAR(MAX)
		;

	CREATE TABLE	#OW_DailySummary (
						gameTypeId		INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	phienCount		INT
					,	betCount		INT
					,	stake			DECIMAL(19,4)
					,	winLost			DECIMAL(19,4)
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
FROM		dbo.bettransRnG AS b WITH (NOLOCK)
INNER JOIN	dbo.bettype AS g WITH (NOLOCK)
		ON	b.gameId = g.typeid
WHERE	b.vendorID = @VendorId
	AND	b.Transdate3rd >= @ReportDate
	AND	b.Transdate3rd < DATEADD(DAY, 1, @ReportDate)
	AND	b.statusID <> 101 --Reject
GROUP BY b.gameId, g.typenamee, b.CurrencyName
';

		SELECT	@OW_Param = N'';
		SELECT	@OW_Param += N'@VendorId INT, @ReportDate DATETIME';

		INSERT INTO	#OW_DailySummary (gameTypeId, gameType, currency, phienCount, betCount, stake, winLost)
		EXECUTE	DB06KBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @VendorId, @ReportDate;

		RAISERROR('', 0, 0) WITH NOWAIT;
	END;

	BEGIN;
		SELECT	@SB_Query = N'';
		SELECT	@SB_Query += N'\
SELECT	1612 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.taixiu_phiens AS g
INNER JOIN	minigame.taixiu_ones AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1613 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4) AS stake
	,	SUM(b.betwin - (b.chan + b.le + b.red3 + b.red4 + b.white3 + b.white4)) AS winLost
FROM		minigame.xocxoc_phiens AS g
INNER JOIN	minigame.xocxoc_cuocs AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1614 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`) AS stake
	,	SUM(b.betwin - (b.`0` + b.`1` + b.`2` + b.`3` + b.`4` + b.`5`)) AS winLost
FROM		minigame.baucua_phiens AS g
INNER JOIN	minigame.baucua_cuocs AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1615 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.txturbo_phiens AS g
INNER JOIN	minigame.txturbo_ones AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1616 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanle_phiens AS g
INNER JOIN	minigame.chanle_ones AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1617 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.bet) AS stake
	,	SUM(CASE WHEN b.win = true THEN b.betwin ELSE b.tralai - b.bet END) AS winLost
FROM		minigame.chanleturbo_phiens AS g
INNER JOIN	minigame.chanleturbo_ones AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
--	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
UNION
SELECT	1618 AS gameTypeId
	,	u.currency AS currency
	,	COUNT(DISTINCT b.phien) AS phienCount
	,	COUNT(1) AS betCount
	,	SUM(b.dragon + b.tie + b.tiger) AS stake
	,	SUM(b.betwin - (b.dragon + b.tie + b.tiger)) AS winLost
FROM		minigame.minidragontiger_phiens AS g
INNER JOIN	minigame.minidragontiger_cuocs AS b
		ON	g.id = b.phien
INNER JOIN	minigame.userinfos AS u
		ON	b.uid = u.id
WHERE	g.time >= ''' + CONVERT(NVARCHAR(MAX), @ReportDate, 127) + N'''
	AND	g.time < ''' + CONVERT(NVARCHAR(MAX), DATEADD(DAY, 1, @ReportDate), 127) + N'''
	AND	b.thanhtoan = true
	AND	u.type = 0
GROUP BY u.currency
;';

		INSERT INTO	#SB_DailySummary (gameTypeId, currency, phienCount, betCount, stake, winLost)
		EXECUTE	(@SB_Query) AT SABABI01;

		RAISERROR('', 0, 0) WITH NOWAIT;
	END;

	SELECT	*
		,	[||] = '||'
		,	[phien]		= CASE WHEN ow.phienCount = sb.phienCount THEN '   OK   ' ELSE '~~~NG~~~' END
		,	[bet]		= CASE WHEN ow.betCount = sb.betCount THEN '   OK   ' ELSE '~~~NG~~~' END
		,	[stake]		= CASE WHEN ow.stake = sb.stake THEN '   OK   ' ELSE '~~~NG~~~' END
		,	[winLost]	= CASE WHEN ow.winLost = sb.winLost THEN '   OK   ' ELSE '~~~NG~~~' END
	FROM			#OW_DailySummary AS ow
	FULL OUTER JOIN	#SB_DailySummary AS sb
				ON	ow.gameTypeId = sb.gameTypeId
				AND	ow.currency = sb.currency
	ORDER BY CASE WHEN ISNULL(ow.currency, sb.currency) = 'UUS' THEN 1 ELSE 0 END, ow.gameTypeId, sb.gameTypeId, ow.currency, sb.currency;

	DROP TABLE	#OW_DailySummary;
	DROP TABLE	#SB_DailySummary;
END;
GO