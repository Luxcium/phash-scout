import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import fs from 'fs';
import { immediateZalgo } from '../../../utils';
import { asyncDirListWithFileType } from '../../files';
import { redisCreateClient } from '../tools';
const phash = require('sharp-phash');

const RADIUS = '10';
const CURRENT_PATH = '/home/luxcium/WSD_250/jpgs_ipn_impt_2022-02-04';
const QUERY = 'IMGSCOUT.QUERY';
const ADD = 'IMGSCOUT.ADD';

// type RawReply = RedisCommandRawReply;
// type Reply = P<RawReply>;

type P<T> = Promise<T>;
type S = string;
type FilePath = {
  folder: S;
  path: S;
  name: S;
};

type TX = P<{
  transact: P<{
    rawQueryResult: P<null | RedisCommandRawReply>;
    insertResult: P<null | RedisCommandRawReply>;
  }>;
  name: S;
  phash_: P<S>;
  path: S;
  index: number;
}>;

type QueryResultItem = [path: S, id: number, radius: S];
function isQueryResultItem(item: unknown): item is QueryResultItem {
  return (
    Array.isArray(item) &&
    item.length === 3 &&
    typeof item[0] === 'string' &&
    typeof item[1] === 'number' &&
    typeof item[2] === 'string'
  );
}

export type QueryResult = [path: S, id: number, radius: S][];
function isQueryResult(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}

// const willR = void 'R';

const queryPhash = (R: any) => async (k: S, phash_: P<S>) => {
  const P = bigString(await phash_);
  return R.sendCommand([QUERY, k, P, RADIUS]);
};

const addPhash =
  (R: any) =>
  async (k: S, p: P<S>, t: S): P<RedisCommandRawReply> =>
    R.sendCommand([ADD, k, bigString(await p), t]);

// export async function addAndQuerry(
//   R: any,
//   k: S,
//   phash_: P<string>,
//   title: S
// ) {
//   const insertResult: P<RedisCommandRawReply> = addPhash(R)(
//     k,
//     phash_,
//     title
//   );
//   const rawQueryResult: P<RedisCommandRawReply> = queryPhash(R)(
//     k,
//     phash_,
//     insertResult
//   );
//   const awaitedQuery = await rawQueryResult;
//   if (awaitedQuery) {
//     const strQuery = String(awaitedQuery);
//     strQuery;
//     console.log('\n', strQuery, '\n', awaitedQuery, '\n');
//   }
//   return { insertResult, rawQueryResult };
// }

// P<RedisCommandRawReply | null>
// type QueryResult__ = [string, number, string][];

export async function querryAndAdd(
  R: any,
  k: S,
  phash_: P<S>,
  title: S
): P<{
  rawQueryResult: P<RedisCommandRawReply>;
  insertResult: P<null> | P<null | RedisCommandRawReply>;
}> {
  const rawQueryResult: P<RedisCommandRawReply> = queryPhash(R)(k, phash_);
  const awaitedQuery = await rawQueryResult;
  if (awaitedQuery) {
    if (isQueryResult(awaitedQuery)) {
      if (awaitedQuery.length > 0) {
        return {
          insertResult: immediateZalgo(null),
          rawQueryResult,
        };
      }
      const insertResult: P<RedisCommandRawReply> = addPhash(R)(
        k,
        phash_,
        title
      );
      return {
        insertResult,
        rawQueryResult,
      };
    }
  }
  return {
    insertResult: immediateZalgo(null),
    rawQueryResult,
  };
}

main().then().catch(console.error);
async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');

  const filesList = asyncDirListWithFileType(folder);
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();
  // function(k: S, phash_: P<string>, title: S): P<RedisCommandRawReply>

  const filesPathList = (await filesList)
    .filter(i => i.isFile)
    .map(f => ({ folder, path: `${folder}/${f.fileName}`, name: f.fileName }))
    .map(phashNow)
    .map(async r => {
      const awaited = await r;
      const { name, phash_, path, index, folder } = awaited;
      // XXX: BROKEN
      const transact = querryAndAdd(R, `TEST:${folder}`, phash_, path);
      return { transact, name, phash_, path, index, folder };
    })
    .map(async tx => {
      // XXX: BROKEN
      // willLog(tx);
      return tx;
    })
    .map(async r => {
      const awaited = await r;
      const { transact, name, phash_, path, index } = awaited;
      return {
        transact: {
          insertResult: await (await transact).insertResult,
          rawQueryResult: await (await transact).rawQueryResult,
        },
        name,
        phash_: await phash_,
        path,
        index,
        folder,
      };
    });

  const allfilesPathList = Promise.all(filesPathList);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}

export async function willLog(tx: TX) {
  const awaited = await tx;
  const { transact, name, phash_, path } = awaited;
  const transact_ = await transact;
  console.log(
    path,
    bigString(await phash_),
    name,
    await transact_.insertResult,
    '\n rawQueryResult:',
    await transact_.rawQueryResult
  );
}

export async function phashNow(imgFile: FilePath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.path);
  const phash_: P<string> = phash(thisImage);
  return { phash_, index, ...imgFile };
}

export function bigString(str: S): S {
  if (str.length === 64) return BigInt(`0b${str}`).toString();

  throw new Error(
    'Something bad happened. because the string was not 64 bit long'
  );
}
