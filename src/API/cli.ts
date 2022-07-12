#!/usr/bin/env node

import yargs from 'yargs';

export const result = yargs
  .scriptName('pirate-parser')
  .usage('$0 <cmd> [args]')
  .command(
    'hello [name]',
    'welcome ter yargs!',
    function (argv) {
      argv.positional('name', {
        type: 'string',
        default: 'Cambi',
        describe: 'the name to say hello to',
      });
    },

    function (argv) {
      console.log('hello', argv.name, 'welcome to yargs!');
    }
  )
  .help().argv;
