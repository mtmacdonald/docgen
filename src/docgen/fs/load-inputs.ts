import pico from 'picocolors';
import { readFile } from './fs.ts';
import { validateJSON } from '../validation/validation.ts';
import { TInputConfig } from '../types.ts';

export const loadInputs = async ({
  inputPath,
  verbose,
}): Promise<TInputConfig | undefined> => {
  const inputConfig = {
    parameters: null,
    contents: [],
  };
  console.log(pico.green('Loading required JSON metadata files'));
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
            inputConfig[key] = file;
          } else {
          }
        } catch (error) {
          console.log(
            pico.red(
              'Error parsing required file: ' + key + '.json (invalid JSON)',
            ),
          );
          if (verbose === true) {
            console.log(pico.red(error));
          }
        }
      }
    }
    //add the release notes to the contents list
    const extra = {
      heading: 'Extra',
      column: 5,
      pages: [{ title: 'Release notes', source: 'release-notes.md' }],
    };
    // @ts-ignore
    inputConfig.contents.push(extra);
    return {
      rawParameters: inputConfig.parameters,
      contents: inputConfig.contents,
    };
  } catch (error) {
    console.log(pico.red('Error loading required JSON metadata files'));
    if (verbose === true) {
      console.log(pico.red(error));
    }
  }
};
