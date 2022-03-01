import type { CurrentPath, PhashNow, TX } from '../../core/types';
import { filter, immediateZalgo } from '../../core/utils';
import { getCurrentPaths } from '../files/tools/asyncDirListWithFileType';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { uniqueAdd } from './img-scout/querryAndAdd';
import { phashNow } from './phashNow';
import { readListRx } from './readListR1';

main().then().catch(console.error);
async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');

  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host }, () => null);
  await R.connect();

  const step1 = await getCurrentPaths(immediateZalgo(folder));
  const step2 = step1.filter(filter.fileType.file);
  const step3 = step2.map(phashNow);
  const step4 = step3.map(
    async (hash: { path: CurrentPath; phash: PhashNow }): TX => {
      const { path, phash } = hash;
      const phash_ = await phash.willPhash_();
      if (phash_ == null) {
        return {
          transact: immediateZalgo([]),
          path,
          pHash: { value: phash_, ...phash },
        };
      }
      // pQuerryAndAdd?: PQuerryAndAdd;
      //
      //       export type PQuerryAndAdd = {
      //   R: any;
      //   k: S;
      //   phash_: S;
      //   title: S;
      //   radius?: string;
      // };
      const pQuerryAndAdd = {
        R,
        k: `TEST:${path.pathToFile}`,
        phash_,
        title: path.fullPath,
        radius: '3',
      };
      const transact = uniqueAdd(pQuerryAndAdd);
      return {
        transact,
        path,
        pHash: { value: phash_, ...phash },
        pQuerryAndAdd,
      };
    }
  );
  // const step5 = step4.map(async (tx: TX) => {
  //   const log: Promise<{
  //     pHash: {
  //       willPhash_: () => Promise<string | null>;
  //       index: number;
  //       value: string | null;
  //     };
  //     path: CurrentPath;
  //     list: [fullPath: string, id: number, radius: string][];
  //   }> = willLog(tx);
  //   const r = { log, tx };
  //   return r;
  // });

  // const step5 = step4.map(async r2 => {
  //   const { path, pHash, transact } = await (await r2).tx;

  //   return {
  //     transact,
  //     path,
  //     pHash,
  //     listing: (await r2).log,
  //   };
  // });  // const step5 = step4.map(async r2 => {
  //   const { path, pHash, transact } = await (await r2).tx;

  //   return {
  //     transact,
  //     path,
  //     pHash,
  //     listing: (await r2).log,
  //   };
  // });
  const step5 = step4.map(async tx => {
    await readListRx(tx);
    return tx;
  });
  const stepFinal = step5.map(async tx => {
    const aTx = await tx;
    const eachTransact = (await aTx.transact).map(i => i);

    return eachTransact;
  });

  const allfilesPathList = Promise.all(stepFinal);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
