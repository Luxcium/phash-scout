#!/bin/env zsh
pwd
npm publish *.tgz --tag "$(getstamp)" --access public
