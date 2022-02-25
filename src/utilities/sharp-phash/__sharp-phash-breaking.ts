import type { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { CurrentPath, PhashNow } from '../../core/types';
import { TX } from '../../core/types/IQueryListPhash';
import { filter, immediateZalgo } from '../../core/utils';
import { getCurrentPaths } from '../files/tools/asyncDirListWithFileType';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { querryAndAdd } from './img-scout/querryAndAdd';
import { isQueryResult } from './isQueryResult';
import { phashNow } from './phashNow';

// const currentPath = (folder: S) => (f: DirentWithFileType) =>
//   getCurrentPath(f, folder);

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

  const currentPathList = await getCurrentPaths(immediateZalgo(folder));
  const filesList = currentPathList.filter(filter.fileType.file);
  const pHashList = filesList.map(phashNow);
  const transactionResult = pHashList.map(redisTransact(R));

  const awaitAll = transactionResult.map(async item => {
    const { pHash, path, transact } = await item;
    transact;
    pHash;
    path;
    let rawQueryResult: RedisCommandRawReply | null = await immediateZalgo(
      null
    );
    let addResult: RedisCommandRawReply | null = await immediateZalgo(null);
    const transact_ = await transact;
    if (transact_ != null) {
      rawQueryResult = await transact_.rawQueryResult;
      addResult = await transact_.addResult;
    }
    return {
      path,
      phash: pHash.value,
      index: pHash.index,
      rawQueryResult,
      addResult,
    };
  });

  const allfilesPathList = Promise.all(awaitAll);
  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}

main().then().catch(console.error);
function redisTransact(R: any) {
  return async (hash: { path: CurrentPath; phash: PhashNow }) => {
    const { path, phash } = hash;
    const phash_ = await phash.willPhash_();
    if (phash_ == null) {
      return {
        transact: immediateZalgo(null),
        path,
        pHash: { value: phash_, ...phash },
      };
    }
    const transact = querryAndAdd(
      R,
      `TEST:${path.pathToFile}`,
      phash_,
      path.fullPath
    );
    return { transact, path, pHash: { value: phash_, ...phash } };
  };
}
export type RedisCommandRawReplyArray = Array<RedisCommandRawReply>;
export async function younameit(tx: TX): Promise<any> {
  const { transact, path, pHash } = await tx;
  const addResult = (await (await transact)?.addResult) || null;
  const rawQueryResult = (await (await transact)?.rawQueryResult) || null;
  if (addResult != null) {
  }
  if (isQueryResult(rawQueryResult)) {
  }

  const r = { tx, addResult, rawQueryResult, path, pHash };
  return r;
}

/*

export async function willLog(
  tx: TX,
): Promise<{
  pHash: {
    willPhash_: () => Promise<string | null>;
    index: number;
    value: string | null;
  };
  path: CurrentPath;
  list: [fullPath: string, id: number, radius: string][];
}> {
  const { transact, path, pHash } = await tx;
  const transact_ = await transact;
  const addResult = (await transact_?.addResult) || null;
  const rawQueryResult = (await transact_?.rawQueryResult) || null;

  if (addResult != null) {
    // XXX:-----------------------------------------------------------
    const list: [path: S, id: number, radius: S][] = [
      [path.fullPath, addResult as number, '-2'],
    ];

    const result = { pHash, path, list };
    return result;
  }

  if (isQueryResult(rawQueryResult)) {
    rawQueryResult.unshift([path.fullPath, 0, '-1']);
    // XXX:-----------------------------------------------------------
    const list: [path: S, id: number, radius: S][] = rawQueryResult;
    const result = { pHash, path, list };
    return result;
  }
    // XXX:-----------------------------------------------------------
  const list: [path: string, id: number, radius: string][] = [
    [path.fullPath, 0, 'NaN'],
  ];
  const result = { pHash, path, list };
  return result;
}
 Promise<
      | {
          transact: Promise<null>;
          path: CurrentPath;
          pHash: {
            willPhash_: () => Promise<string | null>;
            index: number;
            value: null;
          };
        }
      | {
          transact: Promise<{
            rawQueryResult: Promise<RedisCommandRawReply>;
            addResult: Promise<RedisCommandRawReply>;
          }>;
          path: CurrentPath;
          pHash: {
            willPhash_: () => Promise<string | null>;
            index: number;
            value: string;
          };
        }
    >
 */

// return async (tx: TX) => {
// const log: Promise<{
//   pHash: {
//     willPhash_: () => Promise<string | null>;
//     index: number;
//     value: string | null;
//   };
//   path: CurrentPath;
//   list: [fullPath: string, id: number, radius: string][];
// }> = willLog(tx);
