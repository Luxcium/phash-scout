import { CurrentPath, PhashNow } from '../../core/types';
import { TX } from '../../core/types/IQueryListPhash';
import { filter, immediateZalgo } from '../../core/utils';
import { getCurrentPaths } from '../files/tools/asyncDirListWithFileType';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { uniqueAdd } from './img-scout/querryAndAdd';
import { phashNow } from './phashNow';
import { readListRx } from './readListR1';
import { willLog } from './willLog-working';

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
      const transact = uniqueAdd({
        R,
        k: `TEST:${path.pathToFile}`,
        phash_,
        title: path.fullPath,
        radius: '3',
      });
      return { transact, path, pHash: { value: phash_, ...phash } };
    }
  );
  const step5 = step4.map(async (tx: TX) => {
    const log: Promise<{
      pHash: {
        willPhash_: () => Promise<string | null>;
        index: number;
        value: string | null;
      };
      path: CurrentPath;
      list: [fullPath: string, id: number, radius: string][];
    }> = willLog(tx);
    const r = { log, tx };
    return r;
  });

  const step6 = step5.map(async r2 => {
    const { path, pHash, transact } = await (await r2).tx;

    return {
      transact,
      path,
      pHash,
      listing: (await r2).log,
    };
  });

  const stepFinal = step6.map(async r => {
    const ar = await r;
    readListRx(await ar.listing, ar.path.fullPath, ar.pHash.index);
    return r;
  });

  const allfilesPathList = Promise.all(stepFinal);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
