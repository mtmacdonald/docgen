import pico from 'picocolors';
import path from 'path';
import { cleanDirectory } from './fs/fs.ts';
import { loadMeta } from './fs/meta.ts';
import { loadTemplates } from './fs/templates.ts';
import { loadMarkdown } from './fs/markdown.ts';
import { generatePdf } from './pdf/react-pdf/generate-pdf.tsx';
import { scaffold } from './scaffold/scaffold.ts';
import { sortPages } from './meta/sort-pages.ts';
import { deriveParameters } from './meta/derive-parameters.ts';
import { processPages } from './views/pages/process-pages.tsx';
import { writePages } from './fs/write-pages.ts';
import { createRedirect } from './views/redirect.ts';
import { version } from '../../package.json';

import type { Options } from './types.ts';

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
    const { contents, rawParameters } = await loadMeta({
      inputPath: options.input,
      verbose: options.verbose,
      mainProcess,
    });
    const sortedPages = sortPages({ contents });
    const parameters = deriveParameters({
      rawParameters,
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
      parameters,
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
      options,
      redirectPage: hydratedPages.redirect,
      homePage: contents[0].pages[0],
    });
    if (options.pdf === true) {
      generatePdf({
        options,
        pages,
        parameters,
        sortedPages,
        mainProcess,
      });
    } else {
      console.log(pico.green(pico.bold('Done!')));
    }
  };
}
