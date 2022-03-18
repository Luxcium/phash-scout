import { CURRENT_PATH } from '../../constants/radius';
import { BoxedGenerator } from '../../core';
import { PhashNow, TX } from '../../core/types';
import { immediateZalgo } from '../../core/utils';
import { getCurrentPaths } from '../../packages/file-path/tools/dirListWithFileType';
import { CurrentPath } from '../../packages/file-path/types';
import { filter, getPathWithStats } from '../../packages/file-path/utils';
import { phashNow } from '../../packages/phash-now/phashNow';
import { redisCreateClient } from '../redis/tools';
import { uniqueAdd } from './img-scout/querryAndAdd';
import { readListRx } from './readListR1';

const count = { index1: 1 };
type PHashedPath = { path: CurrentPath; phash: PhashNow };
export type PHashedTuple = [
  pHash: string | null,
  currentPath: CurrentPath,
  count: number
];

export async function rConnect(port = 6383, dbNumber = 0, host = '0.0.0.0') {
  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();
  return R;
}

listFiles(rConnect(), CURRENT_PATH).then().catch(console.error);

export async function listFiles(r: Promise<any>, folder: string) {
  const R = await r;
  const seedString = folder;
  const currentPathList = getPathWithStats(seedString, false);

  const subPathList = currentPathList.slice(1);
  const filesPathList = subPathList.filter(filter.fileType.file);
  const filesPathBoxedGen = BoxedGenerator.of(
    ...(await Promise.all(filesPathList))
  );
  // const filesPathBoxedGen = Array.of(...filesPathList);
  const pHashesBGen = filesPathBoxedGen.map((paths, index) => {
    return phashNow(paths, index || 0);
  });
  const pHashedTupleBGen = pHashesBGen.map(async (hash: PHashedPath) => {
    const { path, phash } = hash;
    const phash_ = await phash.get();
    // const result: PHashedTuple = [phash_, path, count.index1++];
    // result;
    return { phash_, ...path, i: phash.index, count: count.index1++ };
  });
  // pHashedTupleBGen.map(async pHashedTup => {
  //   const [pHash, currentPath, count] = await pHashedTup;
  //   return [pHash, currentPath, count];
  // });
  // uniqueAdd;
  // if (phash_ == null) {
  //   return {
  //     transact: immediateZalgo([]),
  //     path,
  //     pHash: { value: phash_, ...phash },
  //   };
  // }
  // const pQuerryAndAdd = {
  //   R,
  //   k: `TEST:${path.pathToFile}`,
  //   phash_,
  //   title: path.fullPath,
  //   radius: '3',
  // };
  // const transact = uniqueAdd({
  //   R,
  //   k: `TEST:${path.pathToFile}`,
  //   phash_,
  //   title: path.fullPath,
  //   radius: '3',
  // });
  // return {
  //   transact,
  //   path,
  //   pHash: { value: phash_, ...phash },
  //   pQuerryAndAdd,
  // };

  // const step6 = step5.map(async tx => {
  //   console.log(await tx);
  //   // await readListRx(tx);
  //   return tx;
  // });
  const finalStep = pHashedTupleBGen.map(async result => {
    console.timeLog('bunch-of-stuff', await result);
    return result;
  });

  // return Promise.all(finalStep) /* .asyncSpark() */
  //   .then(async r => {
  //     // r.map(i => console.log(i));
  //     await R.QUIT();
  //     return r;
  //   });
  return finalStep.asyncSpark().then(async r => {
    // r.map(i => console.log(i));
    await R.QUIT();
    return r;
  });
}

// main().then().catch(console.error);
export async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');

  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();

  const step1 = (await getCurrentPaths(immediateZalgo(folder))).slice(0, 1);
  const step1b = step1.filter(filter.fileType.file);
  const step2 = BoxedGenerator.of(...step1b);
  const step3 = step2.map((item, index) => phashNow(item, index || 0));
  const step4 = step3.map(
    async (hash: { path: CurrentPath; phash: PhashNow }): TX => {
      const { path, phash } = hash;
      const phash_ = await phash.get();
      if (phash_ == null) {
        return {
          transact: immediateZalgo([]),
          path,
          pHash: { value: phash_, ...phash },
        };
      }
      const pQuerryAndAdd = {
        R,
        k: `TEST:${path.pathToFile}`,
        phash_,
        title: path.fullPath,
        radius: '3',
      };

      const transact = uniqueAdd({
        R,
        k: `TEST:${path.pathToFile}`,
        phash_,
        title: path.fullPath,
        radius: '3',
      });
      return {
        transact,
        path,
        pHash: { value: phash_, ...phash },
        pQuerryAndAdd,
      };
    }
  );

  const step5 = step4.map(async tx => {
    await readListRx(tx);
    return tx;
  });
  const stepFinal = step5.map(async tx => {
    const aTx = await tx;
    const eachTransact = (await aTx.transact).map(i => i);

    return eachTransact;
  });
  const unboxFinalStep = stepFinal.unbox();
  const allfilesPathList = Promise.all(unboxFinalStep);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
