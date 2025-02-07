import pico from 'picocolors';
import { copyDirectory } from '../fs/fs';
import { __dirname } from '../helpers';

export const scaffold = async ({ outputDirectory, verbose }) => {
  console.log(pico.green('Creating scaffold template directory'));
  await copyDirectory(
    __dirname + '/../../include/example',
    outputDirectory,
    verbose,
  );
};
