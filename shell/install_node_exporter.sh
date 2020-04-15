#!/bin/bash

addgroup node_exporter
adduser node_exporter --disabled-password --no-create-home --ingroup node_exporter --quiet --gecos ",,,"
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.0-rc.0/node_exporter-1.0.0-rc.0.linux-amd64.tar.gz
tar xvfz node_exporter-1.0.0-rc.0.linux-amd64.tar.gz
cp node_exporter-1.0.0-rc.0.linux-amd64/node_exporter /usr/local/bin/node_exporter
rm node_exporter-* -rf
chown node_exporter:node_exporter /usr/local/bin/node_exporter

echo "[Unit]" > /etc/systemd/system/node_exporter.service
echo "Description=Node Exporter" >> /etc/systemd/system/node_exporter.service
echo "Wants=network-online.target" >> /etc/systemd/system/node_exporter.service
echo "After=network-online.target" >> /etc/systemd/system/node_exporter.service
echo "" >> /etc/systemd/system/node_exporter.service
echo "[Service]" >> /etc/systemd/system/node_exporter.service
echo "User=node_exporter" >> /etc/systemd/system/node_exporter.service
echo "Group=node_exporter" >> /etc/systemd/system/node_exporter.service
echo "Type=simple" >> /etc/systemd/system/node_exporter.service
echo "ExecStart=/usr/local/bin/node_exporter" >> /etc/systemd/system/node_exporter.service
echo "" >> /etc/systemd/system/node_exporter.service
echo "[Install]" >> /etc/systemd/system/node_exporter.service
echo "WantedBy=multi-user.target" >> /etc/systemd/system/node_exporter.service

systemctl daemon-reload
systemctl enable node_exporter
systemctl start node_exporter