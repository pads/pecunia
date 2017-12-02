#!/bin/sh

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
source "$SCRIPT_PATH/../.env"

if [ $# -eq 0 ]
  then
    echo "Usage: login.sh <state>"
    exit -1
fi

if [[ -z "${CLIENT_ID}" ]]; then
  echo "Set CLIENT_ID"
  exit -1
fi

STATE=$1

open "https://auth.getmondo.co.uk/?client_id=$CLIENT_ID&redirect_uri=http://localhost:3000/oauth/callback&response_type=code&state=$STATE"