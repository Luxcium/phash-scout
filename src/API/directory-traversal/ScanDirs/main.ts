import * as dotenv from 'dotenv';
import { promises } from 'fs';
import sharpPhash from 'sharp-phash';

import { bigString } from '../../../utils';
import { Rc } from '../tools/getCachedPhash';
import { makePhashCacheKey } from './makePhashCacheKey';
import { ScanDirs } from './ScanDirs';

dotenv.config();

const debug = false;

export function getCachedPhashString(R: any) {
  return async (filePath: string) => {
    const pathObj = {
      path: filePath,
      size: (await promises.stat(filePath)).size,
    };
    const lookUP = await pHashLookUp(R, pathObj.path);
    if (lookUP !== false && lookUP !== '') {
      debug && console.log(`lookUP: ${lookUP}`);
      return lookUP;
    } else {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      if (bigStr !== '') {
        if (await redisSetK(R, pathObj.path, bigStr)) {
          debug && console.log(`computed: ${bigStr}`);
          return bigStr;
        }
      }
      debug && console.log(`Error: '<empty string>'`, pathObj);
      return bigStr;
    }
  };
}

const fullRootPath = process.env['scan_2TB_dir'] || '';

const pathStr = fullRootPath;
pathStr;
const validExt = ['.jpg', '.jpeg'];
validExt;

export async function pHashLookUp(
  R: any,
  pathStr: string
): Promise<string | false> {
  const K = makePhashCacheKey(pathStr);
  return R.GET(K).then((lookUP: any) =>
    lookUP !== null ? `${lookUP}` : false
  );
}

export async function getBigStrPHashFromFile(
  imgFilePath: string
): Promise<string> {
  try {
    const thisImage = await promises.readFile(imgFilePath);
    const sharpPhashValue = sharpPhash(thisImage);
    const returnValue = bigString(await sharpPhashValue);
    return returnValue;
  } catch (error) {
    console.error("will return '<empty string>' Error:", error);
    return '';
  }
}

export async function redisSetK(R: any, imgFileAbsPath: string, value: string) {
  const K = makePhashCacheKey(imgFileAbsPath);
  return R.SET(K, value).then((value: any) => value === 'OK');
}

export async function main() {
  const R = await Rc;
  const getPhashString = getCachedPhashString(R);

  const fullRootPath = process.env['scan_2TB_dir'] || '';
  let count = 0;
  const scaner = ScanDirs.from(fullRootPath)
    .addValidExt(['.jpg', '.jpeg', '.png'])
    .map(async (filePath: string) => {
      return {
        phashString: await getPhashString(filePath),
        filePath,
        size: (await promises.stat(filePath)).size,
        count: count++,
      }; // { path: filePath, size: statSync(filePath).size };
    });

  for await (const result of scaner as any) {
    // console.log('phashString result:', await phashString);

    if (result.phashString === '0') {
      console.log(result);
    }
    // phashString;
    // const pathObj = { path: filePath, size: statSync(filePath).size };
    // const lookUP = await pHashLookUp(R, pathObj.path);
    // if (lookUP) {
    //   console.log(`lookUP: ${lookUP}`);
    // } else {
    //   const bigStr = await getBigStrPHashFromFile(pathObj.path);
    //   if (bigStr !== '') {
    //     if (await redisSetK(R, pathObj.path, bigStr)) {
    //       console.log(`computed: ${bigStr}`);
    //     }
    //   }
    // }
  }
}

main();

/*
1) scan each dir recursively → listFilesByType (fn)
3) look is pHash is already calculated
4 a) use the calculated pHash
4 b) generate the pHash and store it in cache
5) add the pHash to the index


 */
// for (const iterator of scaner) {
// }

// void ((filePath: string) => {
//   // console.log(filePath);
//   return filePath;
// });

// const asyncGen = BoxedAsyncGenerator.fromGen<any>(() => scaner.map())
//   .mapAwait((filePath: string) => {
//     console.log(filePath);
//     return filePath;
//   })
//   .mapAwait(filepath => getCachedPhash(filepath));

// BoxedAsyncGenerator;
// getCachedPhash;
// scaner;
// asyncGen;
//   .map(filepath => getCachedPhash(filepath))
//   .map(async phash => console.log(await phash))
//   .asyncSpark();;
// BoxedGenerator.fromGen(() => scaner)
//   .map((filePath: string) => {
//     // console.log(filePath);
//     return filePath;
//   })
//   .map(filepath => getCachedPhash(filepath))
//   .map(async phash => console.log(await phash))
//   .asyncSpark();
