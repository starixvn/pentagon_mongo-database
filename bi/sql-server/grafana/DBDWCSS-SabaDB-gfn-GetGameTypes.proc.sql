USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.GetGameTypes') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.GetGameTypes AS';
END;
GO
ALTER PROCEDURE	gfn.GetGameTypes
					@Type			SMALLINT
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query			NVARCHAR(MAX)
		;

	DECLARE	@Games AS TABLE (
				gameTypeId		SMALLINT
			,	owGameTypeId	INT
			,	nameEN			NVARCHAR(128)
			,	nameVI			NVARCHAR(128)
			,	PRIMARY KEY CLUSTERED (gameTypeId)
			);

	SELECT	@Query = N'';
	SELECT	@Query += N'\
SELECT	`gameId`
	,	`owGameTypeId`
	,	`name.en`
	,	`name.vi`
FROM	summary.game_summary_config;
';

	INSERT INTO	@Games (gameTypeId, owGameTypeId, nameEN, nameVI)
	EXECUTE	(@Query) AT L1_SABABI;

	SELECT	[value]	=	CASE @Type
							WHEN 1 THEN LTRIM(gameTypeId)
							WHEN 2 THEN LTRIM(owGameTypeId)
							WHEN 3 THEN nameEN
							WHEN 4 THEN nameVI
							ELSE nameEn
						END
	FROM	@Games;
END;
GO
EXECUTE	gfn.GetGameTypes 3
