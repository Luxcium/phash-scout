import fs from 'fs';
import { CurrentPath } from '../../core/types';
import { immediateZalgo } from '../../utils';
import { bigString } from './bigString';
const phash = require('sharp-phash');

export function phashNow(imgFile: CurrentPath, index: number) {
  // TODO: implement a non hardcoded version with possibly more exclusisons
  // HACK:
  if (imgFile.fileName !== '.directory') {
    const thisImage = fs.promises.readFile(imgFile.fullPath);
    const willPhash_ = async () => {
      try {
        return await bigString(immediateZalgo(phash(await thisImage)));
      } catch (error) {
        console.error(error, 'Error with file at:', imgFile);
        return immediateZalgo(null);
      }
    };
    return { willPhash_, index: index + 1, ...imgFile };
  }

  return {
    willPhash_: async () => immediateZalgo(null),
    index: index + 1,
    ...imgFile,
  };
}
