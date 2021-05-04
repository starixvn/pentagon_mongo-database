# Define hardcode variables
$scp = 'G:\SCDBBackup\pscp.exe'

$SC1Server = '10.99.99.54'
$SC2Server = '10.99.99.53'
$SC3Server = '10.99.99.53'

$HostKey = '9a:b8:24:be:0e:6b:92:24:e3:9b:16:5a:08:75:50:8a'

$Username = 'backupcopier'
$KeyFile = 'G:\SCDBBackup\backupcopier.ppk'

# Prepare time related variables
$UTC = (Get-Date).ToUniversalTime()
$Year = $UTC.ToString('yyyy')
$Month = $UTC.ToString('MM')
$Day = $UTC.ToString('dd')

$CopyPattern = "*-${Year}${Month}${Day}-000000.zip.bak"


# Run copy backup file for each SC instance
for ($L = 1; $L -le 3; $L++) {
    # Prepare dynamic variables
    $Server = Get-Variable -Name "SC${L}Server" -ValueOnly
    $RemoteFolder = "luminet${L}/daily/${CopyPattern}"
    $LocalFolder = "G:\SCDBBackup\MongoDB\SC${L}\MainDB"

    # Create local folder if not exists
    New-Item -ItemType Directory -Force -Path ${LocalFolder} | Out-Null

    # Run scp command
    $Duration = Measure-Command {
        & ${scp} -q -P 22 -i ${KeyFile} -hostkey ${HostKey} ${Username}@${Server}:${RemoteFolder} ${LocalFolder}
    }
    Write-Output "[SC${L}] ${Year}${Month}${Day} SUCCESS (${Duration})"
}
