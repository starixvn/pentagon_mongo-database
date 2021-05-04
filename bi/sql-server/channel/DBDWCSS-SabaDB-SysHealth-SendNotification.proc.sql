USE	SabaDB;
IF	OBJECT_ID('SysHealth.SendNotification') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE SysHealth.SendNotification AS';
END;
GO
ALTER PROCEDURE	SysHealth.SendNotification
					@Var1			NVARCHAR(MAX)	= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:	20210331@Billy
	Task:		Compare FreeSpins Promotion - Spin Logs data between OW and SB then send result via Notification Channel - [Gitlab: #059]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20210331@Billy:	Initial - [Gitlab: #059]
		- 20210428@Billy:	Fix default @isTest is not behaved correctly - [Gitlab: #060]

	Developer's Notes:
		- @Var1:				[optional]		- Message that will be sent
					<DEFAULT>	NULL			- Message will NOT be sent
		- @Var2:				[optional]		- Is this testing message?
					<DEFAULT>	NULL			- Treat as if testing message
*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@Message		NVARCHAR(MAX)	= @Var1
		,	@isTest			BIT
		;

	BEGIN TRY;
		SELECT	@isTest		= CONVERT(BIT, @Var2);
	END TRY BEGIN CATCH;
		SELECT	@isTest		= 1
	END CATCH;

	DECLARE	@Telegram		NVARCHAR(128)	= CASE @isTest WHEN 0 THEN N'T-SCSYSHEALTH' ELSE N'T-BILLY' END
		;

	IF	@Message IS NOT NULL
	BEGIN;
		EXECUTE	DBNOTI.NotificationDB.dbo.Skype_SendMessage
					@To			= @Telegram
				,	@Msg		= @Message
				;
		RAISERROR(N'Message''s sent to [%s]', 0, 0, @Telegram) WITH NOWAIT;
	END;
	ELSE
	BEGIN;
		RAISERROR(N'NULL message will NOT be sent', 0, 0, @Telegram) WITH NOWAIT;
	END;
END;
GO
GRANT EXECUTE ON SysHealth.SendNotification TO sqlLink AS dbo;
