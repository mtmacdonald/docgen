import chalk from 'chalk';
import path from 'path';
import { writeFile } from '../fs/fs';

export let createRedirect = async ({
  isRedirectEnabled,
  outputDirectory,
  redirectTemplate,
  homePage,
  verbose
}) => {
  if (isRedirectEnabled) {
    let parent = outputDirectory.replace(/\/$/, ''); //trim any trailing slash
    parent = parent.split(path.sep).slice(-1).pop(); //get name of final directory in the path
    let homepage = homePage;
    homepage =
      homepage.source.substr(0, homepage.source.lastIndexOf('.')) + '.html';
    let redirectLink = parent + '/' + homepage;
    let $ = redirectTemplate;
    $('a').attr('href', redirectLink);
    $('meta[http-equiv=REFRESH]').attr('content', '0;url=' + redirectLink);
    let file = outputDirectory + '../' + 'index.html';
    try {
      await writeFile(file, $.html());
    } catch (error) {
      console.log(chalk.red('Error writing redirect file: ' + file));
      if (verbose === true) {
        console.log(chalk.red(error));
      }
      //don't exit because redirect error is not a fatal error
    }
  }
};
