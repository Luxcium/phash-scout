import { promises } from 'fs';

import { getBigStrPHashFromFile } from './getBigStrPHashFromFile';
import { pHashLookUp } from './pHashLookUp';
import { redisSetK } from './redisSetK';

export const debug = false;

export function getCachedPhashString_core(R: any) {
  return async (filePath: string) => {
    const pathObj = {
      path: filePath,
      size: (await promises.stat(filePath)).size,
    };
    const lookUP = await pHashLookUp(R, pathObj.path);
    if (lookUP !== false && lookUP !== '') {
      debug && console.warn(`lookUP: ${lookUP}`);
      return lookUP;
    } else {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      if (bigStr !== '') {
        if (await redisSetK(R, pathObj.path, bigStr)) {
          debug && console.warn(`computed: ${bigStr}`);
          return bigStr;
        }
      }
      debug && console.error(`Error: '<empty string>'`, pathObj);
      return bigStr;
    }
  };
}
