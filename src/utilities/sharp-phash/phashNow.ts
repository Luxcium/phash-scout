import fs from 'fs';
import { CurrentPath } from '../../core/types';
import { immediateZalgo } from '../../utils';
import { bigString } from './bigString';
const phash = require('sharp-phash');

export function phashNow(imgFile: CurrentPath, index: number) {
  const thisImage = fs.promises.readFile(imgFile.fullPath);
  try {
    const pHash = async () => {
      return bigString(phash(await thisImage));
    };
    return { willPhash_: pHash, index: index + 1, ...imgFile };
  } catch (r) {
    console.error(r, 'Error with file at:', imgFile);
    return {
      willPhash_: async () => immediateZalgo(null),
      index: index + 1,
      ...imgFile,
    };
  }
}
