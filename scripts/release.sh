#!/bin/env zsh
pwd
npm publish *.tgz --tag "$(getstamp)" --dry-run --access public
