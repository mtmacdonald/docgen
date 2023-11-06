import chalk from 'chalk';
import cheerio from 'cheerio';
import { readFile } from './fs';
import type { Templates } from '../types';

export const loadTemplates = async ({
  verbose,
  mainProcess
}): Promise<Templates> => {
  const templates = {};
  console.log(chalk.green('Loading templates'));
  try {
    let files = {
      main: await readFile(__dirname + '/../../include/templates/main.html'),
      redirect: await readFile(
        __dirname + '/../../include/templates/redirect.html',
      ),
      webCover: await readFile(
        __dirname + '/../../include/templates/webCover.html',
      ),
      pdfCover: await readFile(
        __dirname + '/../../include/templates/pdfCover.html',
      ),
      pdfHeader: await readFile(
        __dirname + '/../../include/templates/pdfHeader.html',
      ),
      pdfFooter: await readFile(
        __dirname + '/../../include/templates/pdfFooter.html',
      ),
    };
    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        let file = files[key];
        let dom = cheerio.load(file);
        templates[key] = dom;
      }
    }
    return templates;
  } catch (error) {
    console.log(chalk.red('Error loading templates'));
    if (verbose === true) {
      console.log(chalk.red(error));
    }
    mainProcess.exit(1);
  }
};
