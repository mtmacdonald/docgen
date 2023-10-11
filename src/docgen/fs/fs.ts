import path from 'path';
import chalk from 'chalk';
import { promises as fs } from 'fs';

export const readFile = async (filePath: string) => {
  const normalized = path.normalize(filePath);
  try {
    return (await fs.readFile(
      normalized,
      { encoding: 'utf8' },
    ))?.replace(/^\uFEFF/, ''); //remove the BOM (byte-order-mark) from UTF-8 files, if present
  } catch (error) {
    console.log(chalk.red('Error reading file: ' + normalized));
  }
};

export const writeFile = async (filePath: string, data: string) => {
  const normalized = path.normalize(filePath);
  try {
     await fs.writeFile(
      normalized,
      data,
      { encoding: 'utf8' },
    ); //remove the BOM (byte-order-mark) from UTF-8 files, if present
  } catch (error) {
    console.log(chalk.red('Error writing file: ' + normalized));
  }
};
