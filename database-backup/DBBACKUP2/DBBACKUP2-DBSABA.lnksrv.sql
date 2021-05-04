USE	master;

EXECUTE	dbo.sp_addlinkedserver @server = N'DBSABA', @srvproduct = N'SQL_Server', @provider = N'SQLNCLI', @datasrc = N'DBDWCSS';
EXECUTE	dbo.sp_addlinkedsrvlogin @rmtsrvname = N'DBSABA', @useself = N'False', @locallogin = NULL, @rmtuser = N'sqlLink', @rmtpassword = N'########';
EXECUTE	dbo.sp_serveroption @server = N'DBSABA', @optname = N'data access', @optvalue = N'true';
EXECUTE	dbo.sp_serveroption @server = N'DBSABA', @optname = N'rpc', @optvalue = N'true';
EXECUTE	dbo.sp_serveroption @server = N'DBSABA', @optname = N'rpc out', @optvalue = N'true';
EXECUTE	dbo.sp_serveroption @server = N'DBSABA', @optname = N'remote proc transaction promotion', @optvalue = N'false';
GO
