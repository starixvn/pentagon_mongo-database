USE master;
CREATE LOGIN lmnGrafana WITH PASSWORD = N'@132Grafana#';
GO
USE SabaDB;
CREATE USER lmnGrafana FOR LOGIN lmnGrafana;
GRANT EXECUTE ON SCHEMA::dbo TO lmnGrafana;
GO