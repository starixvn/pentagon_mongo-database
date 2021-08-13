USE	SabaDB;
DECLARE	@Object		SYSNAME		= N'Noti.SendNotification'
	,	@Version	SYSNAME		= N'1.0.0'
	;
EXECUTE	dbo.sp_MSR_InitProcedure @Object;
EXECUTE	dbo.sp_MSR_SetVersion @Object, @Version;
GO
ALTER PROCEDURE	Noti.SendNotification
					@Var1			NVARCHAR(MAX)	= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:		20210529@Billy
	Location:		DBDWCSS.SabaDB
	Description:	Send message to telegram channel - [Skynex.SC] DB Notification

	Parameters:
		@Var1:				[optional]		- Message that will be sent
				<DEFAULT>	NULL			- Message will NOT be sent

		@Var2:				[optional]		- Is this testing message?
				<DEFAULT>	NULL			- Treat as if testing message

	Version:	1.0.0
	Revision:
		- [1.0.0]	20210529@Billy	Release Noti.SendNotification
		- [0.0.1]	20210529@Billy	Initital
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

	DECLARE	@Telegram		NVARCHAR(128)	= CASE @isTest WHEN 0 THEN N'T-SCNOTI' ELSE N'T-BILLY' END
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
GRANT EXECUTE ON Noti.SendNotification TO sqlLink AS dbo;
