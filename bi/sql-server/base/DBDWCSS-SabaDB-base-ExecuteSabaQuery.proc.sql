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
				,	@Var1			SQL_VARIANT		= NULL		-- SC
				,	@Var2			SQL_VARIANT		= NULL		-- Env
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@_SC		INT
		,	@_Env		INT
		;

	BEGIN TRY;
		SELECT	@_SC		= ABS(ISNULL(CAST(@Var1 AS INT), 0))
			;
	END TRY
	BEGIN CATCH;
		SELECT	@_SC		= 0
			;
	END CATCH;

	BEGIN TRY;
		SELECT	@_Env		= ABS(ISNULL(CAST(@Var2 AS INT), 0))
			;
	END TRY
	BEGIN CATCH;
		SELECT	@_Env		= 0
			;
	END CATCH;

	IF	CAST(@_SC AS INT) = 1
	AND	CAST(@_Env AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L1_SABABI;

	IF	CAST(@_SC AS INT) = 2
	AND	CAST(@_Env AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L2_SABABI;

	IF	CAST(@_SC AS INT) = 3
	AND	CAST(@_Env AS INT) = 0 -- Active
		EXECUTE	(@Query) AT L3_SABABI;

	IF	CAST(@_SC AS INT) = 1
	AND	CAST(@_Env AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L1_SABAARCBI;

	IF	CAST(@_SC AS INT) = 2
	AND	CAST(@_Env AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L2_SABAARCBI;

	IF	CAST(@_SC AS INT) = 3
	AND	CAST(@_Env AS INT) = 1 -- Archive
		EXECUTE	(@Query) AT L3_SABAARCBI;
END;
GO
