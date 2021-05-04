sudo su
adduser --gecos "" --disabled-password backupcopier
echo '
Match Group backupcopier
  ForceCommand internal-sftp
  ChrootDirectory /var/backup/mongodb
  PermitTunnel no
  AllowAgentForwarding no
  AllowTcpForwarding no
  X11Forwarding no
' >> /etc/ssh/sshd_config
service ssh restart
mkdir /home/backupcopier/.ssh
vim /home/backupcopier/.ssh/authorized_keys
chown backupcopier:backupcopier /home/backupcopier/ -R
chmod 700 /home/backupcopier/.ssh
chmod 600 /home/backupcopier/.ssh/authorized_keys
