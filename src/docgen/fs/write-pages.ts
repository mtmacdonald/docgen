import pico from 'picocolors'
import { copyDirectory, makeDirectory, writeFile } from "./fs";

export const writePages = async ({
  options,
  hydratedPages,
  contents,
  mainProcess,
}) => {
  console.log(pico.green('Writing the web page files'));
  try {
    let promises = {};
    contents.forEach((section) => {
      section.pages.forEach((page) => {
        let key = page.source;
        let name = key.substr(0, page.source.lastIndexOf('.'));
        let path = options.output + name + '.html';
        let html = hydratedPages.pages[key];
        promises[key] = writeFile(path, html);
      });
    });
    //add extra files
    promises['ownership'] = writeFile(
      options.output + 'ownership.html',
      hydratedPages.webCover,
    );
    if (options.pdfEnabled) {
      let pdfTempDir = options.output + 'temp/';
      await makeDirectory(pdfTempDir);
      promises['docgenPdfCover'] = writeFile(
        pdfTempDir + 'pdfCover.html',
        hydratedPages.pdfCover,
      );
      promises['docgenPdfHeader'] = writeFile(
        pdfTempDir + 'pdfHeader.html',
        hydratedPages.pdfHeader,
      );
      promises['docgenPdfFooter'] = writeFile(
        pdfTempDir + 'pdfFooter.html',
        hydratedPages.pdfFooter,
      );
    }
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
    if (options.mathKatex === true) {
      await copyDirectory(
        __dirname + '/../../include/optional/katex',
        options.output + 'require/katex',
        options.verbose,
      );
    }
  } catch (error) {
    console.log(pico.red('Error writing the web page files'));
    if (options.verbose === true) {
      console.log(pico.red(error));
    }
    mainProcess.exit(1);
  }
};