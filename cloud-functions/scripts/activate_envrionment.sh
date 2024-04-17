#!/usr/bin/env bash
export $(xargs < .env)

firebase functions:config:set mux.token="$MUX_TOKEN_ID" mux.secret="$MUX_TOKEN_SECRET"

cd functions
firebase functions:config:get > .runtimeconfig.json