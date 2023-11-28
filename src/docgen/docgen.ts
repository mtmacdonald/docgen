import pico from 'picocolors'
import path from 'path';
import { cleanDirectory } from "./fs/fs";
import { loadMeta } from './fs/meta';
import { loadTemplates } from './fs/templates';
import { loadMarkdown } from './fs/markdown';
import { checkPdfVersion, generatePdf } from './pdf/wkhtmltopdf/wkhtmltopdf';
import { scaffold } from './scaffold/scaffold';
import { sortPages } from './meta/sort-pages';
import { deriveParameters } from './meta/derive-parameters';
import { processTemplates, processPages } from './views/pages/process-pages';
import { writePages } from './fs/write-pages';
import { createRedirect } from './views/redirect';
import { version } from '../../package.json';

import type {
  Options,
} from './types';

export function DocGen(process) {
  let mainProcess = process;
  let options;

  this.getVersion = () => {
    return version;
  };

  this.setOptions = (userOptions: Options) => {
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
    console.log(pico.green(pico.bold('DocGen version ' + version)));
    //delete and recreate the output directory
    await cleanDirectory(options.output, options.verbose);
    const templates = await loadTemplates({
      options,
      mainProcess,
    });
    const {contents, parameters} = await loadMeta({
      inputPath: options.input,
      verbose: options.verbose,
      mainProcess,
    });
    const sortedPages = sortPages({ contents });
    const derivedParameters = deriveParameters({
      parameters: parameters,
      setVersion: options.setVersion,
      setReleaseDate: options.setReleaseDate,
      homeLink: contents[0].pages[0],
    });
    const pages = await loadMarkdown({
      options,
      contents,
      mainProcess,
    });
    const hydratedPages = await processPages({
      templates,
      pages,
      sortedPages,
      derivedParameters,
      options,
      contents,
    });
    await writePages({
      options,
      contents,
      hydratedPages,
      mainProcess,
    });
    await createRedirect({
      isRedirectEnabled: options.redirect,
      outputDirectory: options.output,
      redirectPage: hydratedPages.redirect,
      homePage: contents[0].pages[0],
      verbose: options.verbose,
    });
    if (options.pdf === true) {
      await checkPdfVersion({ options, mainProcess });
      await generatePdf({
        options,
        parameters,
        sortedPages,
        mainProcess
      });
    } else {
      console.log(pico.green(pico.bold('Done!')));
    }
  };
}
