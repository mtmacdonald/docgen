import path from 'node:path';
import { promises as fs } from 'node:fs';
import pico from 'picocolors';

export const readFile = async (filePath: string) => {
  const normalized = path.normalize(filePath);
  try {
    const content = await fs.readFile(normalized, { encoding: 'utf8' });
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
    await fs.cp(normalizedSource, normalizedDestination, { recursive: true });
  } catch (error) {
    console.log(
      pico.red(
        `Error copying directory: ${normalizedSource} to ${normalizedDestination}`,
      ),
    );
    if (verbose) {
      console.log(pico.red(error instanceof Error ? error.message : error));
    }
  }
};
