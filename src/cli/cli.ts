#!/usr/bin/env node

import { program } from 'commander';
import { generate } from './generate/generate.ts';
import { scaffold } from './scaffold/scaffold.ts';
import { version } from '../../package.json';

/*
    parse command-line arguments with node commander
        commander help: http://slides.com/timsanteford/conquering-commander-js
        command-line conventions: http://docopt.org
*/

program.version(version).usage('[command] [--option]');

program
  .command('scaffold')
  .usage('[--option]')
  .description('create a template input directory')
  .option(
    '-o, --output [path]',
    'path to the output directory (default: ./)',
    './',
  )
  .option('-v, --verbose', 'show verbose output including detailed errors')
  .action((command) => {
    scaffold(command);
  });

program
  .command('dev')
  .usage('[--option]')
  .description('create a static website from an input directory')
  .option(
    '-i, --input [path]',
    'path to the input directory [default: ./]',
    './',
  )
  .option(
    '-o, --output [path]',
    'path to the output directory [default: ./output]',
    './output',
  )
  .action((command) => {
    generate(command, 'dev');
  });

program
  .command('build')
  .usage('[--option]')
  .description('create a static website from an input directory')
  .option(
    '-i, --input [path]',
    'path to the input directory [default: ./]',
    './',
  )
  .option(
    '-o, --output [path]',
    'path to the output directory [default: ./output]',
    './output',
  )
  .action((command) => {
    generate(command, 'build');
  });

program.parse(process.argv);

//if no arguments were provided, show help and then exit
if (!process.argv.slice(2).length) {
  program.help();
}
