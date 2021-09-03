#!/bin/env zsh
pwd
rm -fr dist
tsc -b ./tsconfig.build.json
cp 'LICENSE' './dist'
cp '.npmignore' './dist'
cp 'PARADÖX.JPEG' './dist'
cp 'README.md' './dist'
cp 'package.json' './dist'
cp 'package-lock.json' './dist'
rm -f *.tgz
cd ./dist;
pwd
npm pack --pack-destination ../
