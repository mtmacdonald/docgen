import pico from 'picocolors';
import { copyDirectory, writeFile } from './fs';

export const writePages = async ({
  options,
  hydratedPages,
  contents,
  mainProcess,
}) => {
  console.log(pico.green('Writing the web page files'));
  try {
    const promises = contents.flatMap((section) =>
      section.pages.map((page) => {
        const key = page.source;
        const name = key.substr(0, page.source.lastIndexOf('.'));
        const path = options.output + name + '.html';
        const html = hydratedPages.pages[key];
        return writeFile(path, html);
      }),
    );
    await Promise.all(promises);
    //add extra files
    await writeFile(options.output + 'ownership.html', hydratedPages.webCover);
    await copyDirectory(
      __dirname + '/../../include/require',
      options.output + 'require',
      options.verbose,
    ); //CSS, JavaScript
    await copyDirectory(
      options.input + 'files',
      options.output + 'files',
      options.verbose,
    ); //user-attached files and images
  } catch (error) {
    console.log(pico.red('Error writing the web page files'));
    if (options.verbose === true) {
      console.log(pico.red(error));
    }
    mainProcess.exit(1);
  }
};
