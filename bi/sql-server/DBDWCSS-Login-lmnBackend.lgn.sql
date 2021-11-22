USE master;
CREATE LOGIN lmnBackend WITH PASSWORD = N'---';
GO
USE SabaDB;
CREATE USER lmnBackend FOR LOGIN lmnBackend;
GO
