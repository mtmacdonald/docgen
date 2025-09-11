import path from 'path';
import { scaffold } from './scaffold/scaffold.ts';
import { version } from '../../package.json';

import type { Options } from './types.ts';

export function DocGen() {
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
}
