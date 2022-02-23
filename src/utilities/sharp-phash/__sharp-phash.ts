import { filter, immediateZalgo } from '../../core/utils';
import { getCurrentPaths } from '../files/tools/asyncDirListWithFileType';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { phashNow } from './phashNow';
import { querryAndAdd } from './querryAndAdd';
import { readListRx } from './readListR1';
import { willLog } from './willLog';

// const currentPath = (folder: S) => (f: DirentWithFileType) =>
//   getCurrentPath(f, folder);

main().then().catch(console.error);
async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');

  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();

  const step1 = await getCurrentPaths(immediateZalgo(folder));
  // const step0 = await dirListWithFileType(immediateZalgo(folder));
  // const step1 = step0.map(currentPath(folder));
  const step2 = step1.filter(filter.fileType.file);
  const step3 = step2.map(phashNow);
  const step4 = step3.map(async r1 => {
    const { willPhash_, fullPath, pathToFile, ...rest } = r1;
    const phash_ = await willPhash_();
    if (phash_ == null) {
      return {
        transact: immediateZalgo(null),
        fullPath,
        pathToFile,
        phash_,
        ...rest,
      };
    }
    const transact = querryAndAdd(R, `TEST:${pathToFile}`, phash_, fullPath);
    return { transact, fullPath, pathToFile, phash_, ...rest };
  });
  const step5 = step4.map(async tx => {
    const log: Promise<{
      pHash: string | null;
      fileName: string;
      list: [fullPath: string, id: number, radius: string][];
    }> = willLog(tx);
    const r = { log, tx };
    return r;
  });
  const step6 = step5.map(async r2 => {
    const ar2 = await r2;
    const atx = await ar2.tx;
    const aTransact = await atx.transact;
    const transact = {
      rawQueryResult: aTransact?.rawQueryResult || null,
      addResult: aTransact?.addResult || null,
    };

    const { fileName, phash_, fullPath, index } = await (await r2).tx;

    return {
      transact,
      fileName,
      phash_,
      fullPath,
      index,
      folder,
      listing: (await r2).log,
    };
  });

  const stepFinal = step6.map(async r => {
    const ar = await r;
    readListRx(await ar.listing, ar.fullPath, ar.index);
    return r;
  });

  const allfilesPathList = Promise.all(stepFinal);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
