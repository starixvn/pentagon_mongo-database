USE	SabaDB;
IF	OBJECT_ID('Bot.SkynexQuery') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE Bot.SkynexQuery AS';
END;
GO
ALTER PROCEDURE	Bot.SkynexQuery
					@Var1			SQL_VARIANT		= NULL
				,	@Var2			NVARCHAR(MAX)	= NULL
WITH ENCRYPTION
AS
/*
	Creator:	20210411@Billy
	Task:		Query Saba information via Skynex commands - [Gitlab: #060]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20210411@Billy:	Initial - [Gitlab: #060]

	Developer's Notes:
		- @Var1:					[optional]		- aka @ConversationId - the id that identified the channel that issuing the query
						<DEFAULT>	NULL			- Invalid
		- @Var2:					[optional]		- aka @Command - the query string
						<DEFAULT>	NULL			- Invalid
*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@_ConversationId		VARCHAR(256)
		,	@_Command				NVARCHAR(MAX)
		;

	BEGIN TRY;
		SELECT	@_ConversationId	= CONVERT(VARCHAR(256), @Var1)
			,	@_Command			= @Var2
			;

		IF	@_ConversationId IS NULL
		OR	@_Command IS NULL
		OR	@_Command NOT LIKE N'saba %'
			GOTO InvalidResponse;

		TODO:
		DECLARE	@Commands AS TABLE (
					id			INT
				,	cmd			NVARCHAR(MAX)
				,	PRIMARY KEY CLUSTERED (id)
				);
		INSERT INTO	@Commands (id, cmd)
		SELECT	id, val
		FROM	base.f_SplitString(@_Command, N' ', NULL)
		WHERE	id > 1;

		SELECT	[result] = @_ConversationId + N' - ' + CAST(COUNT(1) AS NVARCHAR(MAX)) + N'_' + CAST(CHECKSUM_AGG(BINARY_CHECKSUM(*)) AS NVARCHAR(MAX))
		FROM	@Commands;
		RETURN;
	END TRY BEGIN CATCH;
		GOTO InvalidResponse;
	END CATCH;

	InvalidResponse:
	BEGIN;
		SELECT	[result] = N'Please send **help** to get my commands'
		RETURN;
	END;
END;
GO
GRANT EXECUTE ON Bot.SkynexQuery TO sqlLink AS dbo;
GO
EXECUTE	Bot.SkynexQuery N'TEST', N'saba ';
