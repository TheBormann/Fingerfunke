#!/usr/bin/env bash
lt --port 5001 --subdomain fingerfunkerobin &

firebase emulators:start --import=./saved-data --export-on-exit