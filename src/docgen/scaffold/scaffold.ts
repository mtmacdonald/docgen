import pico from 'picocolors';
import { copyDirectory, entrypointDirectory } from '../fs/fs';
import { join } from 'path';

export const scaffold = async ({ outputDirectory, verbose }) => {
  console.log(pico.green('Creating scaffold template directory'));
  await copyDirectory(
    join(entrypointDirectory, 'include/example'),
    outputDirectory,
    verbose,
  );
};
