import { promises } from 'fs';

import { Rc } from '../../tools/getCachedPhash';
import { ScanDirs } from '../ScanDirs';
import { getCachedPhashString_core } from './getCachedPhashString_core';

export async function main() {
  const R = await Rc;
  const getPhashString = getCachedPhashString_core(R);

  const fullRootPath = process.env['scan_2TB_dir'] || '';
  let count = 0;
  // TODO: use listFilesByType fn
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
