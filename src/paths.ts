import { accessSync, constants } from 'node:fs';
import { join, resolve } from 'node:path';

/*
  TODO: simplify this. Can it be relative to the running CLI script?
  Or handled in one place at the CLI entry-point and passed as args?
 */

export const findPackageRoot = (start = import.meta.dirname) => {
  let dir = start;
  while (true) {
    try {
      accessSync(join(dir, 'package.json'), constants.R_OK);
      return dir;
    } catch {
      /* not here, step up */
    }
    const parent = resolve(dir, '..');
    if (parent === dir) throw new Error('package root not found');
    dir = parent;
  }
};

export const findTemplateDir = (start = import.meta.dirname) => {
  const root = findPackageRoot(start);
  const candidates = [
    join(root, 'src', 'template'),
    join(root, 'dist', 'template'),
  ];
  for (const dir of candidates) {
    try {
      accessSync(dir, constants.R_OK);
      return dir;
    } catch {
      // try next candidate
    }
  }
  throw new Error(`template directory not found under ${root}`);
};

export const findAppDir = (start = import.meta.dirname) => {
  const root = findPackageRoot(start);
  const candidates = [join(root, 'src', 'app'), join(root, 'dist', 'app')];
  for (const dir of candidates) {
    try {
      accessSync(dir, constants.R_OK);
      return dir;
    } catch {
      // try next candidate
    }
  }
  throw new Error(`template directory not found under ${root}`);
};
