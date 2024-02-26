#!/usr/bin/env node

import { program } from 'commander';
import { buildIcons } from './build-icons';

program
  .command('build-icons')
  .description('build the SVG icons')
  .action(() => {
    buildIcons();
  });

program.parse(process.argv);

//if no arguments were provided, show help and then exit
if (!process.argv.slice(2).length) {
  program.help();
}
