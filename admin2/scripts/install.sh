#!/bin/sh
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}==>1. Check the port 3000 & 30001${NC}"
lsof -ti:3001 | xargs kill
lsof -ti:3000 | xargs kill
pm2 kill

echo "${BLUE}==>2. Remove cache/node_module and re-install ${NC}"
rm -rf $TMPDIR/react-*
rm -rf node_modules/
rm -rf dist/
rm -rf theme/dist/
rm package-lock.json
rm yarn-error.log
npm install

echo "${BLUE}==>3. Start the server ${NC}"
npm run build
