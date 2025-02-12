import { join } from 'path';
import pico from 'picocolors';
import { copyDirectory } from '../fs/fs';
import { packageAbsolutePath } from '../../paths';

export const scaffold = async ({ outputDirectory, verbose }) => {
  console.log(pico.green('Creating scaffold template directory'));
  await copyDirectory(
    join(packageAbsolutePath, 'include/example'),
    outputDirectory,
    verbose,
  );
};
