USE	SabaBK2DB;
IF	OBJECT_ID('dbo.GetFileSize_Byte') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.GetFileSize_Byte AS';
END;
GO
ALTER PROCEDURE	dbo.GetFileSize_Byte
					@_1				SQL_VARIANT		= NULL
				,	@Size			BIGINT			OUTPUT
WITH ENCRYPTION
AS
/*
	Creator:	20210428@Billy
	Task:		Get File Size in Byte
	Database:	DBBACKUP2.SabaBK2DB

	Revisions:
		- 20210429@Billy:	Initial

	Developer's Notes:
		- @_1:					[Required]		- File path
*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@FilePath	NVARCHAR(1024)
		,	@Query		NVARCHAR(MAX)
		,	@Param		NVARCHAR(MAX)
		;

	BEGIN TRY;
		SELECT	@FilePath = CAST(@_1 AS NVARCHAR(1024));
	END TRY BEGIN CATCH;
		GOTO FileInvalid;
	END CATCH;

	IF	@FilePath IS NULL
		GOTO FileInvalid;

	DECLARE	@FileExist AS TABLE (
				doesExist			BIT
			,	isDir				BIT
			,	doesParentDirExist	BIT
			);

	INSERT INTO	@FileExist (doesExist, isDir, doesParentDirExist)
	EXECUTE	sys.xp_fileexist @FilePath;

	IF	EXISTS (SELECT 1 FROM @FileExist WHERE doesExist = 0)
		GOTO FileInvalid;

	SELECT	@Query = N''
		,	@Param = N''
		;
	SELECT	@Query += N'\
SELECT	@Size = DATALENGTH(fl.BulkColumn)
FROM	OPENROWSET(BULK N''' + REPLACE(REPLACE(@FilePath, CHAR(39), CHAR(39) + CHAR(39)), CHAR(39), CHAR(39) + CHAR(39)) + N''', SINGLE_BLOB) AS fl
OPTION (RECOMPILE);
'
		,	@Param += N'@Size BIGINT OUTPUT'
		;

	EXECUTE	sys.sp_executesql @Query, @Param, @Size OUTPUT;
	RETURN;

	FileInvalid:
	SELECT	@Size = -1;
	RETURN;
END;
GO

DECLARE	@Size BIGINT
	,	@Time	DATETIME2 = SYSUTCDATETIME()
EXECUTE	dbo.GetFileSize_Byte N'G:\SCDBBackup\MongoDB\SC3\MainDB\minigame-20210429-000000.zip.bak', @Size OUTPUT;
SELECT	@Size, DATEDIFF(MICROSECOND, @Time, SYSUTCDATETIME());
