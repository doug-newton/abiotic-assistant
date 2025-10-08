#!/bin/bash

set -e

api_user_script=/docker-entrypoint-initdb.d/001-create-api-user.js

tmpfile="$api_user_script.tmp"

sed "s/__USERNAME__/\"$(cat /run/secrets/mongo_api_user)\"/" $api_user_script \
	| sed "s/__PASSWORD__/\"$(cat /run/secrets/mongo_api_passwd)\"/" > $tmpfile

mv $tmpfile $api_user_script

exec /usr/local/bin/docker-entrypoint.sh "$@"
