#!/bin/sh
set -e
echo "Installing root dependencies..."
npm install
echo "Building web app..."
npx expo export -p web
echo "Copying dist to server/public..."
mkdir -p server/public
cp -r dist/* server/public
echo "Installing server dependencies..."
cd server && npm install
