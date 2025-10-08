#!/bin/bash

set -e

conf_file=/app/abiotic_assistant.conf
tmp_file="$conf_file.tmp"

mongo_api_user=$(cat /run/secrets/mongo_api_user)
mongo_api_pass=$(cat /run/secrets/mongo_api_passwd)

sed "s/__USERNAME__/$mongo_api_user/" $conf_file \
	| sed "s/__PASSWORD__/$mongo_api_pass/" \
	| sed "s/__MONGO_DB__/$ABIOTIC_MONGO_DB/" > $tmp_file

mv $tmp_file $conf_file

exec "$@"
