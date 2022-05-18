import fs from 'fs';
import { immediateZalgo } from '../../utilities/utils';
import { bigString } from '../big-string/bigString';
import { notExcluded } from '../file-path/tools/notExclude';
import { PathWithStats } from '../file-path/types';

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
    phash: { get: async () => immediateZalgo(), index: index + 1 },
  };
}

/*
: CurrentPath &  {
    willPhash_: () => Promise<string | null>;
    index: number;
}
 */
