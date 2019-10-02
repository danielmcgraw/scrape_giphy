#!/bin/sh

if [ "$#" -ne 4 ]
then
	echo "Missing arguments"
	echo "./scrape.sh <keyword> <save_path> <api_key> <call_delay>"
	exit 1
fi

while true;
do
	API_KEY=$3 node scrape_giphy.js $1 $2;
	sleep $4;
done
