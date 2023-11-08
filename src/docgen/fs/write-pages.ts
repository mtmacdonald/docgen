import pico from 'picocolors'
import { copyDirectory, makeDirectory, writeFile } from "./fs";

export const writePages = async ({
  inputPath,
  outputPath,
  templates,
  pages,
  contents,
  pdfEnabled,
  mathKatex,
  verbose,
  mainProcess
}) => {
  console.log(pico.green('Writing the web page files'));
  try {
    let promises = {};
    contents.forEach((section) => {
      section.pages.forEach((page) => {
        let key = page.source;
        let name = key.substr(0, page.source.lastIndexOf('.'));
        let path = outputPath + name + '.html';
        let html = pages[key].html();
        promises[key] = writeFile(path, html);
      });
    });
    //add extra files
    promises['ownership'] = writeFile(
      outputPath + 'ownership.html',
      templates.webCover.html(),
    );
    if (pdfEnabled) {
      let pdfTempDir = outputPath + 'temp/';
      await makeDirectory(pdfTempDir);
      promises['docgenPdfCover'] = writeFile(
        pdfTempDir + 'pdfCover.html',
        templates.pdfCover.html(),
      );
      promises['docgenPdfHeader'] = writeFile(
        pdfTempDir + 'pdfHeader.html',
        templates.pdfHeader.html(),
      );
      promises['docgenPdfFooter'] = writeFile(
        pdfTempDir + 'pdfFooter.html',
        templates.pdfFooter.html(),
      );
    }
    await copyDirectory(
      __dirname + '/../../include/require',
      outputPath + 'require',
      verbose,
    ); //CSS, JavaScript
    await copyDirectory(
      inputPath + 'files',
      outputPath + 'files',
      verbose,
    ); //user-attached files and images
    if (mathKatex === true) {
      await copyDirectory(
        __dirname + '/../../include/optional/katex',
        outputPath + 'require/katex',
        verbose,
      );
    }
  } catch (error) {
    console.log(pico.red('Error writing the web page files'));
    if (verbose === true) {
      console.log(pico.red(error));
    }
    mainProcess.exit(1);
  }
};