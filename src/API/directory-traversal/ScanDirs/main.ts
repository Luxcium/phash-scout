import * as dotenv from 'dotenv';
import { statSync } from 'fs';
import humanSize from 'human-size';

import { ScanDirs } from './ScanDirs';

dotenv.config();
export async function main() {
  const fullRootPath = process.env['scan_2TB_dir'] || '';
  console.log('# scan dir:', fullRootPath);

  const scaner = ScanDirs.from(fullRootPath)
    .addValidExt(['.mp4', '.mov'])
    .map((filePath: string) => {
      return [
        statSync(filePath).size,
        `${filePath.split(`${fullRootPath}/`)[1]}`,
      ];
    });
  console.log(`fullRootPath="${fullRootPath}"`);
  let count = 1;
  for await (const path of scaner) {
    // console.log((path as any)[1]);
    if (Number((path as any)[0]) > 1024 * 1024 * 1) {
      console.log(
        `ln "\${fullRootPath}/${(path as any)[1]}" "${count++}-${(
          path as string[]
        )[1]
          .split('/')
          .slice(-1)}" # ${humanSize((path as any)[0])}`
      );
    }
  }
}

main();

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
