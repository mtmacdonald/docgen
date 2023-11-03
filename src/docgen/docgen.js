import chalk from 'chalk';
import path from 'path';
import { cleanDirectory } from './fs/fs';
import { loadMeta } from './fs/meta';
import { loadTemplates } from './fs/templates';
import { loadMarkdown } from './fs/markdown';
import { checkPdfVersion, generatePdf } from './pdf/wkhtmltopdf/wkhtmltopdf';
import { scaffold } from './scaffold/scaffold';
import { sortPages } from './meta/sort-pages';
import { generateWebTableOfContents } from './html/web-table-of-contents';
import { insertParameters, processPages } from './html/process-pages';
import { writePages } from './fs/write-pages';
import { createRedirect } from './html/redirect';
import { version } from '../../package.json';

export function DocGen(process) {
  let mainProcess = process;
  let options;
  let templates = {};
  let meta = {};
  let pages = {};
  let sortedPages = {};

  this.getVersion = () => {
    return version;
  };

  this.setOptions = (userOptions) => {
    options = userOptions;
    //all user-specified paths must be normalized
    if (options.input) {
      options.input = path.normalize(options.input + '/');
    }
    if (options.output) {
      options.output = path.normalize(options.output + '/');
    }

    //wkhtmltopdf path does not need a trailing slash
    if (options.wkhtmltopdfPath && options.wkhtmltopdfPath !== '') {
      options.wkhtmltopdfPath = path.normalize(options.wkhtmltopdfPath);
    }
  };

  /*
    copy the example src files (template) to any directory, when scaffold command is invoked
  */

  this.scaffold = async () =>
    scaffold({
      outputDirectory: options.output,
      verbose: options.verbose === true,
    });

  this.run = async () => {
    console.log(chalk.green.bold('DocGen version ' + version));
    //delete and recreate the output directory
    await cleanDirectory(options.output);
    templates = await loadTemplates({
      verbose: options.verbose,
      mainProcess,
    });
    meta = await loadMeta({
      inputPath: options.input,
      verbose: options.verbose,
      mainProcess,
    });
    sortedPages = sortPages({ tableOfContents: meta.contents });
    pages = await loadMarkdown({
      verbose: options.verbose,
      contents: meta.contents,
      inputPath: options.input,
      mainProcess,
    });
    templates.main = generateWebTableOfContents({
      sortedPages,
      name: meta.parameters.name,
      mainTemplate: templates.main,
      pdfEnabled: options.pdf,
    });
    insertParameters({
      inputPath: options.input,
      parameters: meta.parameters,
      setVersion: options.setVersion,
      setReleaseDate: options.setReleaseDate,
      templates,
      mathMathjax: options.mathMathjax,
      mathKatex: options.mathKatex,
      version,
      homeLink: meta.contents[0].pages[0],
    });
    templates.webCover = await processPages({
      pages,
      pageTableOfContentsEnabled: options.pageToc,
      tableOfContents: meta.contents,
      mainTemplate: templates.main,
      webCover: templates.webCover,
    });
    await writePages({
      inputPath: options.input,
      outputPath: options.output,
      contents: meta.contents,
      templates,
      pages,
      pdfEnabled: options.pdf,
      mathKatex: options.mathKatex,
      verbose: options.verbose,
      mainProcess,
    });
    await createRedirect({
      isRedirectEnabled: options.redirect,
      outputDirectory: options.output,
      redirectTemplate: templates.redirect,
      homePage: meta.contents[0].pages[0],
      verbose: options.verbose,
    });
    if (options.pdf === true) {
      await checkPdfVersion({ options, mainProcess });
      await generatePdf({ options, meta, sortedPages, mainProcess });
    } else {
      console.log(chalk.green.bold('Done!'));
    }
  };
}
