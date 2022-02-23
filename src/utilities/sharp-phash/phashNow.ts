import fs from 'fs';
import { CurrentPath, PhashNow } from '../../core/types';
import { immediateZalgo } from '../../utils';
import { bigString } from './bigString';
const phash = require('sharp-phash');

export function phashNow(
  imgFile: CurrentPath,
  index: number
): { path: CurrentPath; phash: PhashNow } {
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
    return { path: imgFile, phash: { willPhash_, index: index + 1 } };
  }

  return {
    path: imgFile,
    phash: { willPhash_: async () => immediateZalgo(null), index: index + 1 },
  };
}

/*
: CurrentPath &  {
    willPhash_: () => Promise<string | null>;
    index: number;
}
 */
