#!/bin/bash
pid=0

# SIGTERM-handler
term_handler() {
    if [ $pid -ne 0 ]; then
        kill -s TERM "$pid"
        wait "$pid"
    fi
    service rsyslog stop
    echo "================  END  ================"
    exit 143;   # 128 + 15 -- SIGTERM
}

# Run service
echo "================ START ================"
service rsyslog start

# Execute handler
trap 'kill ${!}; term_handler' TERM

# Run application
mongosqld --config /etc/mongosqld.conf &
pid="$!"

# Wait
while true
do
  tail -f /dev/null & wait ${!}
done