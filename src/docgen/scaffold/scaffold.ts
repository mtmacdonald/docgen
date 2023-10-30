import chalk from 'chalk';
import { copyDirectory } from "../fs/fs";

export const scaffold = async ({
  outputDirectory,
  verbose
}) => {
  console.log(chalk.green('Creating scaffold template directory'));
  await copyDirectory(
    __dirname + '/../../include/example',
    outputDirectory,
    verbose,
  );
};
