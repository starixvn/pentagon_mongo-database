USE	SabaDB;
SET NOCOUNT ON;
GO
IF	OBJECT_ID('base.f_SplitString') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE FUNCTION base.f_SplitString() RETURNS @r TABLE (a INT) AS BEGIN RETURN END;';
END;
GO
ALTER FUNCTION	base.f_SplitString (
					@string		NVARCHAR(MAX)
				,	@splitter	NVARCHAR(MAX)
				,	@id			INT				= NULL
				)
RETURNS	@result TABLE (
			id	INT
		,	val	NVARCHAR(MAX)
		)
WITH ENCRYPTION
AS
/*
	Creator:	20190125@Billy
	Task:		Split String Function - Multi Statement Version

	Revisions:
		- 20190125@Billy:	Initial
		- 20210413@Billy:	Using DATALENGTH instead of LEN because of data trimming

	Developer's Notes:
		- @string:		Input string that need to be split
		- @splitter:	Input string that used to separate the string
		- @id:			The id of the value to be returned
			[DEFAULT]		NULL		Get all values

*/
BEGIN;
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
	INSERT INTO	@result (id, val)
	SELECT	[id]	= cte.id
		,	[val]	= SUBSTRING(@string, cte.start, cte.finish - cte.start)
	FROM	cte
	WHERE	cte.id = ISNULL(@id, cte.id)
	OPTION (MAXRECURSION 0);

	RETURN;
END;
GO
