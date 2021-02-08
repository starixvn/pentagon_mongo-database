USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('gfn.GetMetaData') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE gfn.GetMetaData AS';
END;
GO
ALTER PROCEDURE	gfn.GetMetaData
					@Type			NVARCHAR(128)	= NULL
				,	@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Query			NVARCHAR(MAX)
		;

	IF	@Type IN (N'ɢᴀᴍᴇᴛʏᴘᴇ')
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	'
+ CASE	CAST(@Var2 AS INT)
		WHEN 1 THEN N'TRIM(`gameId`)'
		WHEN 2 THEN N'TRIM(`owGameTypeId`)'
		WHEN 3 THEN N'`name.en`'
		WHEN 4 THEN N'`name.vi`'
		ELSE N'`name.en`'
  END
+  N' AS "value"
FROM	summary.game_summary_config;
';

		EXECUTE	base.ExecuteSabaQuery @Query, @Var1, 0;
		RETURN;
	END;

	IF	@Type IN (N'ᴄᴜʀʀᴇɴᴄʏ')
	BEGIN;
		SELECT	@Query = N'';
		SELECT	@Query += N'\
SELECT	DISTINCT
		`currency` AS "value"
FROM	summary.daily_summaries;
';

		EXECUTE	base.ExecuteSabaQuery @Query, @Var1, 0;
		RETURN;
	END;
END;
GO
