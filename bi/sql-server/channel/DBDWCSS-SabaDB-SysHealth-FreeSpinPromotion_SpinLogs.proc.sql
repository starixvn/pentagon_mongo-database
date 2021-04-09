USE	SabaDB;
IF	OBJECT_ID('SysHealth.FreeSpinPromotion_SpinLogs') IS NULL
BEGIN;
	EXECUTE	sys.sp_executesql N'CREATE PROCEDURE SysHealth.FreeSpinPromotion_SpinLogs AS';
END;
GO
ALTER PROCEDURE	SysHealth.FreeSpinPromotion_SpinLogs
					@Var1			SQL_VARIANT		= NULL
				,	@Var2			SQL_VARIANT		= NULL
WITH ENCRYPTION
AS
/*
	Creator:	20210331@Billy
	Task:		Compare FreeSpins Promotion - Spin Logs data between OW and SB then send result via Notification Channel - [Gitlab: #059]
	Database:	DBDWCSS.SabaDB

	Revisions:
		- 20210331@Billy:	Initial - [Gitlab: #059]

	Developer's Notes:
		- @Var1:				[optional]		- Round that being checked
					<DEFAULT>	NULL			- Latest round
		- @Var2:				[optional]		- Is this testing execution?
					<DEFAULT>	NULL			- Treat as if testing

*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SET NOCOUNT ON;

	DECLARE	@SportType		INT 			= 150
		,	@Status			NVARCHAR(128)	= N'OK'
		;

	DECLARE	@RoundID		INT
		,	@isTest			BIT
		,	@OW_Query		NVARCHAR(MAX)
		,	@OW_Param		NVARCHAR(MAX)
		,	@DS_Query		NVARCHAR(MAX)
		;

	BEGIN TRY;
		SELECT	@RoundID = CAST(@Var1 AS INT);
	END TRY BEGIN CATCH END CATCH;

	BEGIN TRY;
		SELECT	@isTest		= CONVERT(BIT, @Var2);
	END TRY BEGIN CATCH;
		SELECT	@isTest		= 1
	END CATCH;

	IF	@RoundID IS NULL
	BEGIN;
		SELECT	@OW_Query = N''
			,	@OW_Param = N''
			;
		SELECT	@OW_Query += N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	TOP(1)
		@RoundID = ld.RoundID
FROM	dbo.LuckyDraw3rd AS ld WITH (NOLOCK)
ORDER BY ID DESC
OPTION (RECOMPILE)
'
			,	@OW_Param += N'@RoundID INT OUTPUT'
			;

		EXECUTE	DBTRANSKBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @RoundID OUTPUT;
	END;

	IF	@RoundID IS NULL
		RETURN;

	DECLARE	@Message		NVARCHAR(MAX)
		,	@Title			NVARCHAR(512)
		;

	DECLARE	@OW_FreeSpins AS TABLE (
				RoundID			INT
			,	CustID			INT
			,	FreeSpinCount	INT
			,	StatusId		SMALLINT
			,	PRIMARY KEY CLUSTERED (RoundID, CustID)
			);

	DECLARE	@SB_FreeSpins AS TABLE (
				roundId			INT
			,	memberId		INT
			,	spinCnt			INT
			,	PRIMARY KEY CLUSTERED (roundId, memberId)
			);

	DECLARE	@Diff AS TABLE (
				roundId			INT
			,	memberId		INT
			,	spinDiff		INT
			,	PRIMARY KEY CLUSTERED (roundId, memberId)
			);

	-- OW Query --
	BEGIN;
		SELECT	@OW_Query = N''
			,	@OW_Param = N''
			;
		SELECT	@OW_Query += N'\
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;

SELECT	ld.RoundID, ld.CustID, ld.FreeSpinCount, ld.StatusId
FROM	dbo.LuckyDraw3rd AS ld WITH (NOLOCK)
WHERE	ld.RoundID = @RoundID
OPTION (RECOMPILE);
'
			,	@OW_Param += N'@RoundID INT'
			;

		INSERT INTO	@OW_FreeSpins (RoundID, CustID, FreeSpinCount, StatusId)
		EXECUTE	DBTRANSKBT.bodb02.sys.sp_executesql @OW_Query, @OW_Param, @RoundID;
	END;

	BEGIN;
		SELECT	@DS_Query = N'';
		SELECT	@DS_Query += N'\
SELECT	sl.roundId, sl.memberId, sl.spinCnt
FROM	minigame.spin_logs AS sl
WHERE	sl.roundId = ' + CAST(@RoundID AS NVARCHAR(MAX)) + N'
';

		INSERT INTO	@SB_FreeSpins (roundId, memberId, spinCnt)
		EXECUTE	base.ExecuteSabaQuery @DS_Query, 2, 0;
	END;

	INSERT INTO	@Diff (roundId, memberId, spinDiff)
	SELECT	[roundId]	= ISNULL(ow.RoundID, sb.roundId)
		,	[memberId]	= ISNULL(ow.CustID, sb.memberId)
		,	[spinDiff]	= ISNULL(ow.FreeSpinCount, 0) - ISNULL(sb.spinCnt, 0)
	FROM			@OW_FreeSpins AS ow
	FULL OUTER JOIN	@SB_FreeSpins AS sb
				ON	ow.RoundID = sb.roundId
				AND	ow.CustID = sb.memberId
	WHERE	ISNULL(ow.FreeSpinCount, -1) <> ISNULL(sb.spinCnt, -2);

	IF	EXISTS (SELECT 1 FROM @Diff)
	BEGIN;
		SELECT	@Status = N'NG';

		SELECT	@Message	= N'\\\[' + @Status + N'\] \\\[Spin Logs\]' + r.str
		FROM		(
			SELECT	N'  

---
`Round ' + CONVERT(NVARCHAR(MAX), rd.roundId) + N'`' + d.str
			FROM		(
				SELECT	DISTINCT
						roundId
				FROM	@Diff
			) AS rd
			CROSS APPLY	(
				SELECT	N'  
    \- memberCnt: ' + CONVERT(NVARCHAR(MAX), COUNT(1)) + N'  
    \- OW extra spins: ' + CONVERT(NVARCHAR(MAX), SUM(CASE WHEN df.spinDiff > 0 THEN df.spinDiff ELSE 0 END)) + N'  
    \- SB extra spins: ' + CONVERT(NVARCHAR(MAX), SUM(CASE WHEN df.spinDiff < 0 THEN df.spinDiff ELSE 0 END))
				FROM	@Diff AS df
				WHERE	df.roundId = rd.roundId
				FOR XML PATH ('')
				,	TYPE
			) AS xd(xml)
			CROSS APPLY	(
				SELECT	xd.xml.value('.', 'NVARCHAR(MAX)')
			) AS d(str)
			FOR XML PATH ('')
			,	TYPE
		) AS xr(xml)
		CROSS APPLY	(
			SELECT	xr.xml.value('.', 'NVARCHAR(MAX)')
		) AS r(str);

		EXECUTE	SysHealth.SendNotification @Message, @isTest;
	END;
	ELSE
	BEGIN;
		SELECT	@Message	= N'\\\[' + @Status + N'\] \\\[Spin Logs\]' + r.str
		FROM		(
			SELECT	N'  

---
`Round ' + CONVERT(NVARCHAR(MAX), rd.roundId) + N'`' + s.str
			FROM		(
				SELECT	DISTINCT
						roundId
				FROM	@SB_FreeSpins
			) AS rd
			CROSS APPLY	(
				SELECT	N'  
    \- memberCnt: ' + CONVERT(NVARCHAR(MAX), COUNT(1)) + N'  
    \- spinsCnt : ' + CONVERT(NVARCHAR(MAX), SUM(sb.spinCnt))
				FROM	@SB_FreeSpins AS sb
				WHERE	sb.roundId = rd.roundId
				FOR XML PATH ('')
				,	TYPE
			) AS xs(xml)
			CROSS APPLY	(
				SELECT	xs.xml.value('.', 'NVARCHAR(MAX)')
			) AS s(str)
			FOR XML PATH ('')
			,	TYPE
		) AS xr(xml)
		CROSS APPLY	(
			SELECT	xr.xml.value('.', 'NVARCHAR(MAX)')
		) AS r(str);

		EXECUTE	SysHealth.SendNotification @Message, @isTest;
	END;
END;
GO
EXECUTE	SysHealth.FreeSpinPromotion_SpinLogs NULL, 1;
GO
