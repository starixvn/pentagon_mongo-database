USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('base.WaitForRandom') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE base.WaitForRandom AS';
END;
GO
ALTER PROCEDURE	base.WaitForRandom
					@Var1			SQL_VARIANT		= NULL		-- Sec
WITH ENCRYPTION
AS
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@_Sec		INT
		;

	BEGIN TRY;
		SELECT	@_Sec = ABS(ISNULL(CAST(@Var1 AS INT), 3))
			;
	END TRY
	BEGIN CATCH;
		SELECT	@_Sec = 3
			;
	END CATCH;

	DECLARE	@WaitFor	VARCHAR(16)		= '00:00:0'
										+ CAST(ABS(CHECKSUM(NEWID())) % @_Sec AS CHAR(1))
										+ '.'
										+ CAST(ABS(CHECKSUM(NEWID())) % 1000 AS CHAR(3))
		;

	WAITFOR DELAY @WaitFor;
END;
GO
