USE SabaDB;
DECLARE	@Procedure	SYSNAME		= N'dbr.GetExchangeDailyOANDA'
	,	@Version	SYSNAME		= N'1.0.0'
	;
EXECUTE	dbo.sp_MSR_InitProcedure @Procedure;
EXECUTE	dbo.sp_MSR_SetVersion @Procedure, @Version;
GO
ALTER PROCEDURE	dbr.GetExchangeDailyOANDA
					@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:		20211018@Billy
	Location:		DBDWCSS.SabaDB
	Description:	Get Exchange OANDA data from OW database

	Parameters:
		@Var1				[optional]		- The date of data that will be selected. The time is in UTC-4 timezone.
				<DEFAULT>	NULL			- Newest date from OW OANDA

	Version:	1.0.0
	Revision:
		- [1.0.0]	20211018@Billy		Release dbr.GetExchangeDailyOANDA
		- [0.0.1]	20211018@Billy		Initital
*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Timer			DATETIME2		= SYSUTCDATETIME()
		;

	DECLARE	@Date			DATETIME
		,	@Env			TINYINT
		,	@ExchangeDate	DATETIME
		,	@Query			NVARCHAR(MAX)
		,	@Param			NVARCHAR(MAX)
		;

	BEGIN TRY SELECT @Date = CONVERT(DATETIME, @Var1); END TRY BEGIN CATCH SELECT @Date = NULL; END CATCH;
	BEGIN TRY SELECT @Env  = CONVERT(TINYINT , @Var2); END TRY BEGIN CATCH SELECT @Env  = NULL; END CATCH;

	DECLARE	@CheckDate AS TABLE (
				latest			DATETIME
			,	query			DATETIME
			);
	DECLARE	@Codes AS TABLE (
				code			NVARCHAR(128)
			);

	/** Get the date to be selected */
	INSERT INTO	@CheckDate (latest, query)
	EXECUTE	dbr.OW_CheckExchangeDate @Date;

	SELECT	@ExchangeDate = ISNULL(query, latest)
	FROM	@CheckDate;

	/** Get list of currency codes to be selected */
	INSERT INTO	@Codes (code)
	EXECUTE	dbr.SB_GetExchangeCodeList 1, @Env;

	/** Get OANDA data */
	SELECT	@Query = N''
		,	@Param = N''
		;
	SELECT	@Query = @Query + N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	DISTINCT
		[ExchangeDate]	= o.ExchangeDate
	,	[Code]			= e.code
	,	[USD]			= CAST(o.USD / e.MultipliedBy AS DECIMAL(28,20))
FROM		dbo.exchange AS e
INNER JOIN	dbo.ExchangeDailyOanda AS o
		ON	e.exchangeid = o.ExchangeId
WHERE	e.IsActive = 1
	AND	o.ExchangeDate = @Date
	AND	e.code IN (' + SUBSTRING(sc.str, 0, LEN(sc.str)) + N')
ORDER BY e.code ASC
OPTION (RECOMPILE);
'
		,	@Param = @Param + N'@Date DATETIME'
	FROM	(
		SELECT	N'''' + code + N''', '
		FROM	@Codes
		FOR XML PATH ('')
		,	TYPE
	) AS xc(xml)
	CROSS APPLY	(
		SELECT	xc.xml.value('.', 'NVARCHAR(MAX)')
	) AS sc(str)
	;
	PRINT @Query;
	PRINT @Param;
	EXECUTE	DB061KBT.bodb02.sys.sp_executesql @Query, @Param, @ExchangeDate;

	RETURN	DATEDIFF(MILLISECOND, @Timer, SYSUTCDATETIME());
END;
GO
EXECUTE	dbr.GetExchangeDailyOANDA NULL, 3;
