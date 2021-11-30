USE	SabaDB;
DECLARE	@Object		SYSNAME		= N'base.ExecuteSabaQuery'
	,	@Version	SYSNAME		= N'1.2.0'
	;
EXECUTE	dbo.sp_MSR_InitProcedure @Object;
EXECUTE	dbo.sp_MSR_SetVersion @Object, @Version;
GO
ALTER PROCEDURE	base.ExecuteSabaQuery
					@Query			NVARCHAR(MAX)	= NULL
				,	@Var1			SQL_VARIANT		= NULL		-- L
				,	@Var2			SQL_VARIANT		= NULL		-- Type
				,	@Var3			SQL_VARIANT		= NULL		-- Env
WITH ENCRYPTION
AS
/*
	Creator:		20210208@Billy
	Location:		DBDWCSS.SabaDB
	Description:	Execute query on Luminet system

	Parameters:
		@Query:				[optional]		- The query to be executed.
				<DEFAULT>	NULL			- Do nothing

		@Var1:				[optional]		- The Luminet system to be executed on.
				<DEFAULT>	NULL			- Do nothing

		@Var2:				[optional]		- Is the system active?
				<DEFAULT>	NULL			- Active
							1				- Archive

		@Var3:				[optional]		- The environment of system.
				<DEFAULT>	NULL			- Do nothing
							1				- Production
							2				- Do nothing (UAT reserved)
							3				- SIT

	Version:	1.2.0
	Revision:
		- [1.2.0]	20211130@Billy		Support UAT Environment
		- [1.1.0]	20210722@Billy		Support SIT Environment
		- [1.0.2]	20210419@Billy		Do nothing if query is empty - [Gitlab: #060]
		- [1.0.1]	20210322@Billy		Apply code convention - [Gitlab: #059]
		- [1.0.0]	20210208@Billy		Release base.ExecuteSabaQuery - [Gitlab: #058]
		- [0.0.1]	20210208@Billy		Initital - [Gitlab: #058]
*/
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
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 2 -- UAT
		EXECUTE	(@Query) AT L1_SABAUATBI;

	IF	@_L    = 2
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 2 -- UAT
		EXECUTE	(@Query) AT L2_SABAUATBI;

	IF	@_L    = 3
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 2 -- UAT
		EXECUTE	(@Query) AT L3_SABAUATBI;

	IF	@_L    = 1
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L1_SABASITBI;

	IF	@_L    = 2
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L2_SABASITBI;

	IF	@_L    = 3
	AND	@_Type IN (0, 1) -- Mixxed
	AND	@_Env  = 3 -- SIT
		EXECUTE	(@Query) AT L3_SABASITBI;
END;
GO
