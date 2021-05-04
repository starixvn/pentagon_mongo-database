SET NOCOUNT ON;
IF	OBJECT_ID('base.tf_ByteFormat') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE FUNCTION base.tf_ByteFormat() RETURNS TABLE AS RETURN (SELECT a = 0)';
END;
GO
ALTER FUNCTION	base.tf_ByteFormat (
					@input		BIGINT
				)
RETURNS TABLE
WITH ENCRYPTION
AS
/*
	Creator:	20210503@Billy
	Task:		Byte Value Format Function - Inline Table Value Version

	Revisions:
		- 20210503@Billy:	Initial

	Developer's Notes:
		- @input:		Input value
*/
RETURN (
	SELECT	TOP(1)
			[str] = RIGHT(N'   ' + CONVERT(NVARCHAR(MAX), CONVERT(MONEY, d.val, 1)), 8) + pf.value
	FROM	(
		VALUES	(0, ' B')
			,	(1, ' kB')
			,	(2, ' MB')
			,	(3, ' GB')
			,	(4, ' TB')
			,	(5, ' PB')
			,	(6, ' EB')
			,	(7, ' ZB')
			,	(8, ' YB')
	) AS pf(level, value)
	CROSS APPLY	(
		SELECT	[val] = @input / POWER(1024.0, pf.level)
	) AS d
	WHERE	d.val >= 1
	ORDER BY pf.level DESC
);
GO
