import chalk from 'chalk';
import { readFile } from "./fs";
import { validateJSON } from "../validation/validation";

export const loadMeta = async ({
  inputPath,
  verbose,
  mainProcess
}) => {
  const meta = {
    parameters: [],
    contents: [],
  };
  console.log(chalk.green('Loading required JSON metadata files'));
  try {
    let files = {
      parameters: await readFile(inputPath + '/parameters.json'),
      contents: await readFile(inputPath + '/contents.json'),
    };
    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        try {
          let file = JSON.parse(files[key]);
          if (validateJSON({ key, data: file, verbose })) {
            meta[key] = file;
          } else {
            mainProcess.exit(1);
          }
        } catch (error) {
          console.log(
            chalk.red(
              'Error parsing required file: ' + key + '.json (invalid JSON)',
            ),
          );
          if (verbose === true) {
            console.log(chalk.red(error));
          }
          mainProcess.exit(1);
        }
      }
    }
    //add the release notes to the contents list
    let extra = {
      heading: 'Extra',
      column: 5,
      pages: [{ title: 'Release notes', source: 'release-notes.md' }],
    };
    meta.contents.push(extra);
    return meta;
  } catch (error) {
    console.log(chalk.red('Error loading required JSON metadata files'));
    if (verbose === true) {
      console.log(chalk.red(error));
    }
    mainProcess.exit(1);
  }
};
