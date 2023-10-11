import path from 'path';
import chalk from 'chalk';
import { promises as fsp } from 'fs';
const fs = require('fs-extra');

export const readFile = async (filePath: string) => {
  const normalized = path.normalize(filePath);
  try {
    return (await fsp.readFile(
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
     await fsp.writeFile(
      normalized,
      data,
      { encoding: 'utf8' },
    ); //remove the BOM (byte-order-mark) from UTF-8 files, if present
  } catch (error) {
    console.log(chalk.red('Error writing file: ' + normalized));
  }
};

export const copyDirectory = async (
  source: string,
  destination: string,
  verbose: boolean
) => {
  const normalizedSource = path.normalize(source);
  const normalizedDestination = path.normalize(destination);
  try {
    await fs.copySync(normalizedSource, normalizedDestination);
  } catch (error) {
    console.log(
      chalk.red(
        'Error copying directory: ' +
        normalizedSource +
        ' to ' +
        normalizedDestination,
      ),
    );
    if (verbose === true) {
      console.log(chalk.red(error));
    }
  }
};

export const cleanDirectory = async (directoryPath: string, verbose: boolean) => {
  const normalized = path.normalize(directoryPath);
  try {
    await fs.removeSync(normalized);
    await fs.mkdirpSync(normalized);
  } catch (error) {
    console.log(chalk.red('Error recreating directory: ' + normalized));
    if (verbose === true) {
      console.log(chalk.red(error));
    }
  }
};

export const removeDirectory = async (directoryPath: string, verbose: boolean) => {
  const normalized = path.normalize(directoryPath);
  try {
    await fs.removeSync(normalized);
  } catch (error) {
    console.log(chalk.red('Error removing directory: ' + normalized));
    if (verbose === true) {
      console.log(chalk.red(error));
    }
  }
};