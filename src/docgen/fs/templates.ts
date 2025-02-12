import pico from 'picocolors';
import { join } from 'path';
import * as cheerio from 'cheerio';
import { readFile } from './fs';
import type { Templates } from '../types';
import { packageAbsolutePath } from '../../paths';

export const loadTemplates = async ({
  options,
  mainProcess,
}): Promise<Templates> => {
  const templates = {};
  console.log(pico.green('Loading templates'));
  try {
    let files = {
      main: await readFile(
        join(packageAbsolutePath, 'include/templates/main.html'),
      ),
      redirect: await readFile(
        join(packageAbsolutePath, 'include/templates/redirect.html'),
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
    console.log(pico.red('Error loading templates'));
    if (options.verbose === true) {
      console.log(pico.red(error));
    }
    mainProcess.exit(1);
  }
};
