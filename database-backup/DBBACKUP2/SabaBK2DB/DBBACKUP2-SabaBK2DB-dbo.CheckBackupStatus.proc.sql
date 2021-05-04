USE	SabaBK2DB;
IF	OBJECT_ID('dbo.CheckBackupStatus') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE dbo.CheckBackupStatus AS';
END;
GO
ALTER PROCEDURE	dbo.CheckBackupStatus
					@Var1			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:	20210428@Billy
	Task:		Check database backup copy job's status then send result via Notification Channel - [Gitlab: #060]
	Database:	DBBACKUP2.SabaBK2DB

	Revisions:
		- 20210428@Billy:	Initial - [Gitlab: #060]

	Developer's Notes:
		- @Var1:				[optional]		- Is this testing execution?
					<DEFAULT>	NULL			- Treat as if testing execution

*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@SC				TINYINT
		,	@isTest			BIT
		,	@Path			NVARCHAR(1024)
		,	@File			NVARCHAR(1024)
		,	@Size			BIGINT
		,	@Today			DATE
		,	@Message		NVARCHAR(MAX)
		;

	BEGIN TRY;
		SELECT	@isTest		= CONVERT(BIT, @Var1);
	END TRY BEGIN CATCH;
		SELECT	@isTest		= 1
	END CATCH;

	DECLARE	@Files AS TABLE (
				SC			TINYINT			DEFAULT (0)
			,	foldername	NVARCHAR(1000)
			,	filename	NVARCHAR(449)
			,	depth		SMALLINT
			,	isFile		BIT
			,	size		BIGINT
			,	PRIMARY KEY CLUSTERED (SC, filename)
			);

	DECLARE	@SCs AS TABLE (
				SC			TINYINT
			,	isDone		BIT
			,	PRIMARY KEY CLUSTERED (SC)
			);

	INSERT INTO	@SCs (SC)
	VALUES	(1), (2), (3);

	SELECT	@Today = GETUTCDATE()
		;

	UPDATE	@SCs
	SET		isDone = 0;

	WHILE	0 = 0
	BEGIN;
		UPDATE	TOP(1)
				@SCs
		SET		@SC = SC
			,	isDone = 1
		WHERE	isDone = 0;

		IF	@@ROWCOUNT = 0
			BREAK;

		SELECT	@Path = N'G:\SCDBBackup\MongoDB\SC' + CAST(@SC AS NVARCHAR(10)) + N'\MainDB'

		INSERT INTO	@Files (filename, depth, isFile)
		EXECUTE	sys.xp_dirtree @Path, 0, 1;

		UPDATE	@Files
		SET		SC = @SC
			,	foldername = @Path
		WHERE	SC = 0;

		RAISERROR('sys.xp_dirtree - SC%d', 0, 0, @SC) WITH NOWAIT;
	END;

	DELETE	@Files
	WHERE	isFile <> 1;

	WHILE	0 = 0
	BEGIN;
		SELECT	TOP(1)
				@SC = SC
			,	@Path = foldername + N'\' + filename
			,	@File = filename
		FROM	@Files
		WHERE	isFile = 1
			AND	filename LIKE N'%-' + CONVERT(NVARCHAR(MAX), @Today, 112) + N'-%'
			AND	size IS NULL;

		IF	@@ROWCOUNT = 0
			BREAK;

		EXECUTE	dbo.GetFileSize_Byte @Path, @Size OUTPUT;

		UPDATE	@Files
		SET		size = @Size
		WHERE	SC = @SC
			AND	filename = @File;

		RAISERROR('dbo.GetFileSize_Byte - SC%d', 0, 0, @SC) WITH NOWAIT;
	END;

	SELECT	@Message = msg.str
	FROM	(
		SELECT	N'\

---  
\\\[Backup ' + CONVERT(NVARCHAR(MAX), @Today, 23) + N'\] SC' + CONVERT(NVARCHAR(MAX), l.SC) + N'  
' + f.str
		FROM	@SCs AS l
		CROSS APPLY	(
			SELECT	N'    `' + _f.filename + N'` - ' + bf.str + N'  
'
			FROM		@Files AS _f
			CROSS APPLY	base.tf_ByteFormat(_f.size) AS bf
			WHERE	_f.SC = l.SC
				AND	_f.size IS NOT NULL
			ORDER BY _f.filename
			FOR XML PATH ('')
			,	TYPE
		) AS xf(xml)
		CROSS APPLY	(
			SELECT	xf.xml.value('.', 'NVARCHAR(MAX)')
		) AS f(str)
		FOR XML PATH ('')
		,	TYPE
	) AS xmsg(xml)
	CROSS APPLY	(
		SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
	) AS msg(str);
	EXECUTE	DBSABA.SabaDB.SysHealth.SendNotification @Message, @isTest;

	SELECT	@Message = msg.str
	FROM	(
		SELECT	N'\

---  
\\\[Backup Summary\] SC' + CONVERT(NVARCHAR(MAX), l.SC) + N'  
' + f.str
		FROM	@SCs AS l
		CROSS APPLY	(
			SELECT	N'    `' + _db.val + N'` - ' + CONVERT(NVARCHAR(MAX), COUNT(1)) + N' files \(' + MIN(_date.val) + N' ⇒ ' + MAX(_date.val) + N'\)  
'
			FROM		@Files AS _f
			CROSS APPLY	base.tf_SplitString(_f.filename, N'-', 2) AS _db
			CROSS APPLY	base.tf_SplitString(_f.filename, N'-', 3) AS _date
			WHERE	_f.SC = l.SC
			GROUP BY _db.val
			ORDER BY _db.val
			FOR XML PATH ('')
			,	TYPE
		) AS xf(xml)
		CROSS APPLY	(
			SELECT	xf.xml.value('.', 'NVARCHAR(MAX)')
		) AS f(str)
		FOR XML PATH ('')
		,	TYPE
	) AS xmsg(xml)
	CROSS APPLY	(
		SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
	) AS msg(str);
	EXECUTE	DBSABA.SabaDB.SysHealth.SendNotification @Message, @isTest;

	IF	ISNULL(@isTest, 1) = 1
	BEGIN;
		SELECT	*
		FROM	@Files AS f
		OUTER APPLY	base.tf_ByteFormat(f.size) AS bf
		OUTER APPLY	base.tf_SplitString(f.filename, N'-', 2) AS _db
		OUTER APPLY	base.tf_SplitString(f.filename, N'-', 3) AS _date
	END;
END;
GO
EXECUTE	dbo.CheckBackupStatus;
GO
