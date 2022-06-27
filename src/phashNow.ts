import fs from 'fs';
import { bigString } from './tools/bigString';
import { notExcluded } from './tools/notExclude';
import { PathWithStats } from './types';
import { immediateZalgo } from './utils';

const phash = require('sharp-phash');

export function phashNow<T extends PathWithStats>(
  imgFile: T,
  index: number = 0
) {
  if (notExcluded(imgFile)) {
    const thisImage = fs.promises.readFile(imgFile.fullPath);
    const get = async () => {
      try {
        return await bigString(immediateZalgo(phash(await thisImage)));
      } catch (error) {
        // deepcode ignore FormatString: <please specify a reason of ignoring this>
        console.error(error, 'Error with file at:', imgFile);
        return immediateZalgo(null);
      }
    };
    return { path: imgFile, phash: { get, index: index + 1 } };
  }

  return {
    path: imgFile,
    phash: { get: async () => immediateZalgo(null), index: index + 1 },
  };
}
