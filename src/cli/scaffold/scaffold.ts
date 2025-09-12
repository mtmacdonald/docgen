import { join } from 'path';
import pico from 'picocolors';
import { copyDirectory } from '../../docgen/fs/fs.ts';
import { packageAbsolutePath } from '../../paths.ts';
import path from 'node:path';

export const scaffold = async (command) => {
  const outputDir = path.normalize(command.output + '/');
  const verbose = command.verbose === true;
  console.log(pico.green('Creating scaffold template directory'));
  await copyDirectory(
    join(packageAbsolutePath, 'include/template'),
    outputDir,
    verbose,
  );
};
