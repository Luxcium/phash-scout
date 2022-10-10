import { BoxedAsyncGenerator } from '@luxcium/boxed-list';

import { getCachedPhash } from '../tools/getCachedPhash';
import { ScanDirs } from './ScanDirs';

export async function main() {
  const scaner = ScanDirs.from(
    '/media/luxcium/Archive_Locale/import/GAYBOYSTUBE/users'
  ).addValidExt(['jpg']);

  void ((filePath: string) => {
    // console.log(filePath);
    return filePath;
  });

  const asyncGen = BoxedAsyncGenerator.fromGen<any>(() => scaner.map())
    .mapAwait((filePath: string) => {
      //  console.log(filePath);
      return filePath;
    })
    .mapAwait(filepath => getCachedPhash(filepath));
  for await (const path of asyncGen.asyncGen()) {
    console.log(path);
  }
  asyncGen;
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
}

main();
