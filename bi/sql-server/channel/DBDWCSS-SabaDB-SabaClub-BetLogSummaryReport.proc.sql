USE	SabaDB;
EXECUTE	dbo.sp_MSR_InitProcedure N'BetLogSummaryReport', N'SabaClub';
GO
ALTER PROCEDURE	SabaClub.BetLogSummaryReport
					@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:		20210601@Billy
	Location:		DBDWCSS.SabaDB
	Description:	Get Betlog Summary
					Send result via Noti telegram channel

	Parameters:
		@Var1				[optional]		- The date of data that will be fetched. The time is in UTC timezone.
				<DEFAULT>	NULL			- Yesterday

		@Var2:				[optional]		- Is this testing execution?
				<DEFAULT>	NULL			- Treat as if testing


	Version:	1.0.1
	Revision:
		- [1.0.1]	20210722@Billy		Base SP updated for SIT environment support
		- [1.0.0]	20210601@Billy		Release Noti.BetLogSummaryReport - [Gitlab: #058]
		- [0.0.1]	20210601@Billy		Initital - [Gitlab: #058]
*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@ReportDate		DATETIME
		,	@isTest			BIT
		;

	BEGIN TRY;
		SELECT	@ReportDate		= CONVERT(DATETIME, @Var1);
	END TRY BEGIN CATCH;
		SELECT	@ReportDate		= NULL;
	END CATCH;

	BEGIN TRY;
		SELECT	@isTest			= CONVERT(BIT, @Var2);
	END TRY BEGIN CATCH;
		SELECT	@isTest			= NULL;
	END CATCH;

	SELECT	@ReportDate		= ISNULL(@ReportDate, ISNULL(@ReportDate, CAST(DATEADD(DAY, -1, GETUTCDATE()) AS DATE)))
		,	@isTest			= ISNULL(@isTest, 1)
		;

	IF	NOT (DATEDIFF(DAY, @ReportDate, GETUTCDATE()) BETWEEN 1 AND 7)
	BEGIN;
		RAISERROR(N'\
[ERR]   @ReportDate is out of range', 0, 0) WITH NOWAIT;
		RETURN;
	END;

	DECLARE	@SC				INT
		,	@GameId			INT
		,	@GameType		NVARCHAR(128)
		,	@Message		NVARCHAR(MAX)
		,	@Title			NVARCHAR(512)
		;

	DECLARE	@SCs AS TABLE (
				SC				TINYINT
			,	isExpanded		BIT
			,	isDone			BIT
			,	PRIMARY KEY CLUSTERED (SC)
			);

	CREATE TABLE	#DS_DailySummary (
						SC				TINYINT
					,	gameId			INT
					,	gameType		NVARCHAR(128)
					,	currency		VARCHAR(10)
					,	sys				TINYINT
					,	requestCount	INT
					,	betCount		INT
					,	turnOver		DECIMAL(19,4)
					,	PRIMARY KEY CLUSTERED (SC, gameId, currency, sys)
					);

	-- List of SCs --
	INSERT INTO	@SCs
			(SC, isExpanded, isDone)
	VALUES	( 1,          0,      0)
		, 	( 2,          0,      0)
		, 	( 3,          1,      0)
		;

	BEGIN;	-- SB --
		UPDATE	@SCs
		SET		isDone = 0;

		WHILE	EXISTS (SELECT 1 FROM @SCs WHERE isDone = 0)
		BEGIN;
			UPDATE	TOP(1)
					@SCs
			SET		@SC		= SC
				,	isDone	= 1
			WHERE	isDone = 0;

			INSERT INTO	#DS_DailySummary (SC, gameId, gameType, currency, sys, requestCount, betCount, turnOver)
			EXECUTE	dbr.SB_BetLogSummary @SC, 1, @ReportDate;
			RAISERROR('Executed on L%d.', 0, 0, @SC) WITH NOWAIT;
		END;
	END;	-- SB --

	BEGIN;	-- Summary --
		SELECT	@Title		= N'BetLog Summary ' + CONVERT(NVARCHAR(MAX), @ReportDate, 23)
			,	@Message	= msg.str
		FROM	(
			SELECT	N'

' + CASE dsb.SC WHEN 3 THEN N'VG' ELSE 'SC' END + CONVERT(NVARCHAR(MAX), dsb.SC) + N':' + c.str
			FROM	(
				SELECT	SC, isExpanded
				FROM	@SCs
			) AS dsb
			CROSS APPLY	(
				SELECT	N'
    ' + grp.CurGrp + N'
      - RC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.requestCount AS MONEY)), 1), '.00', '') + N'
      - BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'
      - TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.turnOver AS MONEY)), 1)
				FROM		#DS_DailySummary AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded
											WHEN 1 THEN N'(' + _sys.str + N') ' +  UPPER(sb.currency)
											ELSE N'(' + _sys.str + N') Total'
										  END
					FROM	(VALUES (CASE sb.sys WHEN 1 THEN N'ᴄᴏᴄᴏs' WHEN 2 THEN N'ᴍᴏʙɪ' ELSE N'***' END)) AS _sys(str)
				) AS grp
				WHERE	sb.currency <> 'UUS'
					AND	sb.SC = dsb.SC
				GROUP BY grp.CurGrp
				ORDER BY grp.CurGrp
				FOR XML PATH ('')
				,	TYPE
			) AS xc(xml)
			CROSS APPLY	(
				SELECT	xc.xml.value('.', 'NVARCHAR(MAX)')
			) AS c(str)
			ORDER BY dsb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);
		EXECUTE	Letstalk.SendNotification @Message, @Title, @isTest;

		SELECT	@Message	= N'\\\[BetLog Summary ' + CONVERT(NVARCHAR(MAX), @ReportDate, 23) + N'\]' + msg.str
		FROM	(
			SELECT	N'  

---
' + CASE dsb.SC WHEN 3 THEN N'VG' ELSE 'SC' END + CONVERT(NVARCHAR(MAX), dsb.SC) + N':' + c.str
			FROM	(
				SELECT	SC, isExpanded
				FROM	@SCs
			) AS dsb
			CROSS APPLY	(
				SELECT	N'  
    `' + grp.CurGrp + N'`  
      \- RC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.requestCount AS MONEY)), 1), '.00', '') + N'  
      \- BC: ' + REPLACE(CONVERT(NVARCHAR(MAX), SUM(CAST(sb.betCount AS MONEY)), 1), '.00', '') + N'  
      \- TO: ' + CONVERT(NVARCHAR(MAX), SUM(CAST(sb.turnOver AS MONEY)), 1)
				FROM		#DS_DailySummary AS sb
				CROSS APPLY	(
					SELECT	[CurGrp]	= CASE dsb.isExpanded
											WHEN 1 THEN N'(' + _sys.str + N') ' +  UPPER(sb.currency)
											ELSE N'(' + _sys.str + N') Total'
										  END
					FROM	(VALUES (CASE sb.sys WHEN 1 THEN N'ᴄᴏᴄᴏs' WHEN 2 THEN N'ᴍᴏʙɪ' ELSE N'***' END)) AS _sys(str)
				) AS grp
				WHERE	sb.currency <> 'UUS'
					AND	sb.SC = dsb.SC
				GROUP BY grp.CurGrp
				ORDER BY grp.CurGrp
				FOR XML PATH ('')
				,	TYPE
			) AS xc(xml)
			CROSS APPLY	(
				SELECT	xc.xml.value('.', 'NVARCHAR(MAX)')
			) AS c(str)
			ORDER BY dsb.SC
			FOR XML PATH ('')
			,	TYPE
		) AS xmsg(xml)
		CROSS APPLY	(
			SELECT	xmsg.xml.value('.', 'NVARCHAR(MAX)')
		) AS msg(str);
		EXECUTE	Noti.SendNotification @Message, @isTest;
	END;	-- Summary --
END;
GO
EXECUTE	SabaClub.BetLogSummaryReport;
GO
