#!/usr/bin/env bash

CURRENT_LOCATION=$(pwd)
SAVE_DATA_LOCATION="/Users/timlindenau/Programmieren/Flutter/fingerfunke/cloud-functions-data/data"

echo "Current location $CURRENT_LOCATION"
echo "Save data location: $SAVE_DATA_LOCATION"

. ~/.nvm/nvm.sh
nvm use 14
#lt --port 5001 --subdomain fingerfunketim &

# load most current saved-data
cd $SAVE_DATA_LOCATION
#git pull
# start emulator suite
cd $CURRENT_LOCATION
firebase emulators:start --import=$SAVE_DATA_LOCATION --export-on-exit

# after emulators shut down push new data state to repository
# This solution is not perfect since when pushing there can be problems
# these should then be manually resolved by the programmer themselves
# cd $SAVE_DATA_LOCATION
# git add .
# git commit -m 'update saved data'
# git push
