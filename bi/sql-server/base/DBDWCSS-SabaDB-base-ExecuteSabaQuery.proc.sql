USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('base.ExecuteSabaQuery') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE base.ExecuteSabaQuery AS';
END;
GO
ALTER PROCEDURE	base.ExecuteSabaQuery
					@Query			NVARCHAR(MAX)	= NULL
				,	@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	IF	CAST(@Var1 AS INT) = 1 -- SC
	AND	CAST(@Var2 AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L1_SABABI;

	IF	CAST(@Var1 AS INT) = 2 -- SC
	AND	CAST(@Var2 AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L2_SABABI;

	IF	CAST(@Var1 AS INT) = 3 -- SC
	AND	CAST(@Var2 AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L3_SABABI;

	IF	CAST(@Var1 AS INT) = 1 -- SC
	AND	CAST(@Var2 AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L1_SABAARCBI;

	IF	CAST(@Var1 AS INT) = 2 -- SC
	AND	CAST(@Var2 AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L2_SABAARCBI;

	IF	CAST(@Var1 AS INT) = 3 -- SC
	AND	CAST(@Var2 AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L3_SABAARCBI;
END;
GO
