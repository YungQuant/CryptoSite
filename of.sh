#!/bin/bash
echo -n "Port: "
read portnum
echo -n "Processes on port: " $portnum
echo ""
for i in 1 2 3 4 5 6 7 8 9 10 11
do
    lsof -i :$portnum
    echo -n "Kill Pid: "
    read killpid
    kill -9 $killpid
    echo ""
    echo -n "PID: " $killpid
    echo -n "has been killed"
    echo ""
done
