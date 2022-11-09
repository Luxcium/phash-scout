import { promises } from 'fs';
import { RedisClientType } from 'redis';

import { getBigStrPHashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';

export const debug = false;

export function getCachedPhashString_core(R: RedisClientType) {
  return async (filePath: string) => {
    const pathObj = {
      path: filePath,
      size: (await promises.stat(filePath)).size,
    };
    const lookUP = await pHashGetLookUp(R, pathObj.path);
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
