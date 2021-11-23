USE	SabaDB;
DECLARE	@Object		SYSNAME		= N'dbr.tf_GameTypeMapping'
	,	@Version	SYSNAME		= N'1.0.0'
	;
EXECUTE	dbo.sp_MSR_InitInlineTableFunction @Object;
EXECUTE	dbo.sp_MSR_SetVersion @Object, @Version;
GO
ALTER FUNCTION	dbr.tf_GameTypeMapping (
					@gameId		INT
				,	@vendorId	INT
				,	@gameTypeId	INT
				)
RETURNS TABLE
WITH ENCRYPTION
AS
/*
	Creator:		20210416@Billy
	Location:		DBDWCSS.SabaDB
	Description:	URL Decode Function - Inline Table-valued Version

	Parameters:
		@gameId				[REQUIRED]		- The id of game that will be selected
							NULL			- All games

		@vendorId			[REQUIRED]		- The id of vendor that will be selected
							NULL			- All vendors

		@gameTypeId			[REQUIRED]		- The id of game type that will be selected
							NULL			- All games

	Version:	1.0.0
	Revision:
		- [1.0.0]	20210416@Billy		Release dbr.tf_GameTypeMapping
		- [0.0.1]	20210416@Billy		Initital - [Gitlab: #058]
*/
RETURN (
	SELECT	tbl.gameId, tbl.vendorId, tbl.gameTypeId, tbl.baseName
	FROM	(
		VALUES	( 1, 42, 1612, N'taixiu')
			,	( 1, 66, 3802, N'taixiu')
			,	( 2, 42, 1613, N'xocxoc')
			,	( 2, 66, 3803, N'xocxoc')
			,	( 3, 42, 1614, N'baucua')
			,	( 3, 66, 3804, N'baucua')
			,	( 4, 42, 1615, N'txturbo')
			,	( 4, 66, 3805, N'txturbo')
			,	( 5, 42, 1616, N'chanle')
			,	( 5, 66, 3806, N'chanle')
			,	( 6, 42, 1617, N'chanleturbo')
			,	( 6, 66, 3807, N'chanleturbo')
			,	( 7, 42, 1618, N'minidragontiger')
			,	( 7, 66, 3808, N'minidragontiger')
			,	( 8, 42, 1619, N'kenopromax')
			,	( 8, 66, 3809, N'kenopromax')
			,	( 9, 42, 1620, N'minisedie')
			,	( 9, 66, 3823, N'minisedie')
			,	(10, 42, 1621, N'baccarat')
			,	(10, 66, 3810, N'baccarat')
			,	(11, 42, 1622, N'kenoproviet')
			,	(11, 66, NULL, N'kenoproviet')
			,	(12, 42, 1623, N'kenomax')
			,	(12, 66, 3811, N'kenomax')
			,	(13, 42, 1624, N'kenomax2')
			,	(13, 66, 3812, N'kenomax2')
			,	(14, 42, 1625, N'kenomini')
			,	(14, 66, 3813, N'kenomini')
			,	(15, 42, 1626, N'kenomini2')
			,	(15, 66, 3814, N'kenomini2')
			,	(16, 42, 1627, N'kenoeast')
			,	(16, 66, 3815, N'kenoeast')
			,	(17, 42, 1628, N'kenowest')
			,	(17, 66, 3816, N'kenowest')
			,	(18, 42, 1629, N'kenosouth')
			,	(18, 66, 3817, N'kenosouth')
			,	(19, 42, 1630, N'kenonorth')
			,	(19, 66, 3818, N'kenonorth')
			,	(20, 42, 1631, N'bolatangkas')
			,	(20, 66, NULL, N'bolatangkas')
			,	(21, 42, 1632, N'roulette')
			,	(21, 66, 3819, N'roulette')
			,	(22, 42, 1633, N'vipsedie')
			,	(22, 66, 3824, N'vipsedie')
			,	(23, 42, 1634, N'blackjack')
			,	(23, 66, 3820, N'blackjack')
			,	(24, 42, 1635, N'specialsedie')
			,	(24, 66, 3825, N'specialsedie')
			,	(25, 42, 1636, N'sicbo')
			,	(25, 66, 3821, N'sicbo')
			,	(26, 42, 1637, N'vipfishprawncrab')
			,	(26, 66, 3826, N'vipfishprawncrab')
			,	(27, 42, 1638, N'vipbaccarat')
			,	(27, 66, 3827, N'vipbaccarat')
			,	(28, 42, 1639, N'vipsediewar')
			,	(28, 66, 3828, N'vipsediewar')
			,	(29, 42, 1640, N'fourguardians')
			,	(29, 66, 3829, N'fourguardians')
			,	(30, 42, 1641, N'fishprawncrabpro')
			,	(30, 66, 3822, N'fishprawncrabpro')
			,	(31, 42, 1642, N'lottery')
			,	(31, 66, 3830, N'lottery')
			,	(32, 42, NULL, N'baccaratdiamond')
			,	(32, 66, 3832, N'baccaratdiamond')
			,	(33, 42, NULL, N'baccaratsapphire')
			,	(33, 66, 3833, N'baccaratsapphire')
			,	(34, 42, NULL, N'baccaratruby')
			,	(34, 66, 3834, N'baccaratruby')
			,	(35, 42, 1643, N'threecards')
			,	(35, 66, 3831, N'threecards')
			,	(36, 42, 1645, N'kenomatch1')
			,	(36, 66, 3838, N'kenomatch1')
			,	(37, 42, 1646, N'kenomatch2')
			,	(37, 66, 3839, N'kenomatch2')
			,	(38, 42, 1644, N'heroesslot')
			,	(38, 66, 3835, N'heroesslot')
			,	(39, 42, NULL, N'casinoholdempoker')
			,	(39, 66, 3836, N'casinoholdempoker')
			,	(40, 42, 1647, N'kenopower1')
			,	(40, 66, 3840, N'kenopower1')
			,	(41, 42, 1648, N'kenopower2')
			,	(41, 66, 3841, N'kenopower2')
			,	(42, 42, NULL, N'texasholdempoker')
			,	(42, 66, 3837, N'texasholdempoker')
			,	(43, 42, 1649, N'bitcoinmaster')
			,	(43, 66, NULL, N'bitcoinmaster')
	) AS tbl (gameId, vendorId, gameTypeId, baseName)
	WHERE	tbl.gameId		= ISNULL(@gameId, tbl.gameId)
		AND	tbl.vendorId	= ISNULL(@vendorId, tbl.vendorId)
		AND	tbl.gameTypeId	= ISNULL(@gameTypeId, tbl.gameTypeId)
);
GO
