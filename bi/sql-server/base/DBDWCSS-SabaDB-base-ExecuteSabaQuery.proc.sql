USE	SabaDB;
EXECUTE	dbo.sp_MSR_InitProcedure N'ExecuteSabaQuery', N'base';
GO
ALTER PROCEDURE	base.ExecuteSabaQuery
					@Query			NVARCHAR(MAX)	= NULL
				,	@Var1			SQL_VARIANT		= NULL		-- SC
				,	@Var2			SQL_VARIANT		= NULL		-- Type
				,	@Var3			SQL_VARIANT		= NULL		-- Env
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@_L		INT
		,	@_Type	INT
		,	@_Env	INT
		;

	BEGIN TRY SELECT @_L    = ABS(ISNULL(CAST(@Var1 AS INT), 0)); END TRY BEGIN CATCH SELECT @_L    = 0; END CATCH;
	BEGIN TRY SELECT @_Type = ABS(ISNULL(CAST(@Var2 AS INT), 0)); END TRY BEGIN CATCH SELECT @_Type = 0; END CATCH;
	BEGIN TRY SELECT @_Env  = ABS(ISNULL(CAST(@Var3 AS INT), 0)); END TRY BEGIN CATCH SELECT @_Env  = 0; END CATCH;

	IF	NULLIF(@Query, N'') IS NULL
		RETURN;

	IF	@_L    = 1
	AND	@_Type = 0 -- Active
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L1_SABABI;

	IF	@_L    = 2
	AND	@_Type = 0 -- Active
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L2_SABABI;

	IF	@_L    = 3
	AND	@_Type = 0 -- Active
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L3_SABABI;

	IF	@_L    = 1
	AND	@_Type = 1 -- Archive
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L1_SABAARCBI;

	IF	@_L    = 2
	AND	@_Type = 1 -- Archive
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L2_SABAARCBI;

	IF	@_L    = 3
	AND	@_Type = 1 -- Archive
	AND	@_Env  = 1 -- PRO
		EXECUTE	(@Query) AT L3_SABAARCBI;

	IF	@_L    = 1
	AND	@_Type = 0 -- Active
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L1_SABASITBI;

	IF	@_L    = 2
	AND	@_Type = 0 -- Active
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L2_SABASITBI;

	IF	@_L    = 3
	AND	@_Type = 0 -- Active
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L3_SABASITBI;
END;
GO
