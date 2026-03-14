#!/bin/sh
set -e
echo "Installing root dependencies (including dev for build)..."
npm install --include=dev
echo "Building web app..."
npx expo export -p web
echo "Copying dist to server/public..."
mkdir -p server/public
cp -r dist/* server/public
# Fix: load bundle as ES module so import.meta works in browser
if [ -f server/public/index.html ]; then
  sed -i.bak 's/<script defer src=/<script type="module" defer src=/g; s/<script src=/<script type="module" src=/g' server/public/index.html
  rm -f server/public/index.html.bak
fi
echo "Installing server dependencies..."
cd server && npm install
