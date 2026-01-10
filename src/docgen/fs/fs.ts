import path from 'path';
import pico from 'picocolors';
import { promises as fsp } from 'fs';
import fs from 'fs-extra';

export const readFile = async (filePath: string) => {
  const normalized = path.normalize(filePath);
  try {
    const content = await fsp.readFile(normalized, { encoding: 'utf8' });
    // remove the BOM (byte-order-mark) from UTF-8 files, if present
    return content?.replace(/^\uFEFF/, '');
  } catch (error) {
    console.log(pico.red(`Error reading file: ${normalized}`));
    if (error instanceof Error) {
      console.log(pico.dim(error.message));
    }
  }
};

export const copyDirectory = async (
  source: string,
  destination: string,
  verbose: boolean,
) => {
  const normalizedSource = path.normalize(source);
  const normalizedDestination = path.normalize(destination);
  try {
    await fs.copySync(normalizedSource, normalizedDestination);
  } catch (error) {
    console.log(
      pico.red(
        'Error copying directory: ' +
          normalizedSource +
          ' to ' +
          normalizedDestination,
      ),
    );
    if (verbose === true) {
      console.log(pico.red(error));
    }
  }
};
