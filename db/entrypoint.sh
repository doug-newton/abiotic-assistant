#!/bin/bash

set -e

# load secrets into the api user creation script

api_user_script=/docker-entrypoint-initdb.d/001-create-api-user.js

tmpfile="$api_user_script.tmp"

sed 's/__PASSWORD__/\"__PASSWORD__\"/' $api_user_script \
	| sed "s/__PASSWORD__/$(cat /run/secrets/mongo_api_passwd)/" \
	| sed 's/__USERNAME__/\"__USERNAME__\"/' \
	| sed "s/__USERNAME__/$(cat /run/secrets/mongo_api_user)/" > $tmpfile

mv $tmpfile $api_user_script

exec /usr/local/bin/docker-entrypoint.sh "$@"
