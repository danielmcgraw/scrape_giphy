#!/bin/sh

if [ "$#" -ne 3 ]
then
	echo "Missing arguments"
	echo "./scrape.sh <keyword> <save_path> <api_key>"
	exit 1
fi

while true;
do
	API_KEY=$3 node scrape_giphy.js $1 $2;
	sleep 300;
done
