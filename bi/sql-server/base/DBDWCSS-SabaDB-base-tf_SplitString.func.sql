USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('base.tf_SplitString') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE FUNCTION base.tf_SplitString() RETURNS TABLE AS RETURN (SELECT a = 0)';
END;
GO
ALTER FUNCTION	base.tf_SplitString (
					@string		NVARCHAR(MAX)
				,	@splitter	NVARCHAR(MAX)
				,	@id			INT				= NULL
				)
RETURNS TABLE
WITH ENCRYPTION
AS
/*
	Creator:	20190125@Billy
	Task:		Split String Function - Inline Table Value Version

	Revisions:
		- 20190125@Billy:	Initial
		- 20210413@Billy:	Using DATALENGTH instead of LEN because of data trimming

	Developer's Notes:
		- @string:		Input string that need to be split
		- @splitter:	Input string that used to separate the string
		- @id:			The id of the value to be returned
			[DEFAULT]		NULL		Get all values

*/
RETURN (
	WITH cte AS (
				SELECT	[start]		= CAST(1 AS INT)
					,	[finish]	= CASE WHEN CHARINDEX(@splitter, @string, 1) = 0 THEN DATALENGTH(@string) / 2 + 1 ELSE CHARINDEX(@splitter, @string, 1) END
					,	[id]		= 1
				UNION ALL
				SELECT	[start]		= CAST(cte.finish + LEN(@splitter) AS INT)
					,	[finish]	= CASE WHEN CHARINDEX(@splitter, @string, cte.finish + DATALENGTH(@splitter) / 2) = 0 THEN DATALENGTH(@string) / 2 + 1 ELSE CHARINDEX(@splitter, @string, cte.finish + DATALENGTH(@splitter) / 2) END
					,	[id]		= cte.id + 1
				FROM	cte
				WHERE	cte.finish < DATALENGTH(@string) / 2
			)
	SELECT	[id]	= cte.id
		,	[val]	= SUBSTRING(@string, cte.start, cte.finish - cte.start)
	FROM	cte
	WHERE	cte.id = ISNULL(@id, cte.id)
);
GO
