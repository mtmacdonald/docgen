import { join } from 'path';
import pico from 'picocolors';
import { promises as fsp } from 'fs';
import { copyDirectory } from '../../docgen/fs/fs.ts';
import { packageAbsolutePath } from '../../paths.ts';
import path from 'node:path';

export const scaffold = async (command) => {
  const outputDir = path.normalize(command.output + '/');
  const verbose = command.verbose === true;
  console.log(pico.green('Creating scaffold template directory'));
  await copyDirectory(
    join(packageAbsolutePath, 'bundle/template'),
    outputDir,
    verbose,
  );

  // Try to find index.html
  let indexSrc = join(packageAbsolutePath, '..', 'index.html'); // try one directory up
  try {
    await fsp.access(indexSrc);
  } catch {
    // fallback if the first path doesn't exist
    indexSrc = join(packageAbsolutePath, 'index.html');
  }

  const indexDest = join(outputDir, 'index.html');
  console.log(`Copying ${indexSrc} → ${indexDest}`);
  await fsp.copyFile(indexSrc, indexDest);
  console.log(`Copied ${indexSrc} → ${indexDest}`);
};
