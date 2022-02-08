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
    addResult: P<null | RedisCommandRawReply>;
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

export type QueryResult = QueryResultItem[];
function isQueryResult(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}

// const willR = void 'R';

const queryPhash = async (R: any, k: S, phash_: P<S>) => {
  const P = bigString(await phash_);
  return R.sendCommand([QUERY, k, P, RADIUS]);
};

const addPhash = async (R: any, k: S, p: P<S>, t: S): P<RedisCommandRawReply> =>
  R.sendCommand([ADD, k, bigString(await p), t]);

export async function querryAndAdd(
  R: any,
  k: S,
  phash_: P<S>,
  title: S
): P<{
  rawQueryResult: P<RedisCommandRawReply>;
  addResult: P<null> | P<null | RedisCommandRawReply>;
}> {
  try {
    const rawQueryResult: P<RedisCommandRawReply> = queryPhash(R, k, phash_);
    const awaitedQuery = await rawQueryResult;
    if (awaitedQuery) {
      if (isQueryResult(awaitedQuery) && awaitedQuery.length > 0) {
        return {
          addResult: immediateZalgo(null),
          rawQueryResult,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }

  const addResult: P<RedisCommandRawReply> = addPhash(R, k, phash_, title);
  return {
    addResult,
    rawQueryResult: immediateZalgo(null),
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
  const filesPathList = (await filesList)
    .filter(i => i.isFile)
    .map(f => ({ folder, path: `${folder}/${f.fileName}`, name: f.fileName }))
    .map(phashNow)
    .map(async r1 => {
      const awaited = await r1;
      const { name, phash_, path, index, folder } = awaited;
      const transact = querryAndAdd(R, `TEST:${folder}`, phash_, path);
      return { transact, name, phash_, path, index, folder };
    })
    .map(async tx => {
      const log: Promise<
        | {
            pHash: string;
            name: string;
            list: [path: string, id: number, radius: string][];
          }
        | (string | number)[]
      > = willLog(tx);
      const r = { log, tx };
      return r;
    })
    .map(async r2 => {
      const awaited = await r2;

      const { transact, name, phash_, path, index } = await awaited.tx;
      return {
        transact: {
          rawQueryResult: await (await transact).rawQueryResult,
          addResult: await (await transact).addResult,
        },
        name,
        phash_: await phash_,
        path,
        index,
        folder,
        log: await awaited.log,
      };
    })
    .map(async r => {
      console.log(await r);
      return r;
    });

  const allfilesPathList = Promise.all(filesPathList);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}

export async function willLog(tx: TX, log: boolean = false) {
  const awaitedTx = await tx;
  const { transact, name, phash_, path } = awaitedTx;
  const transact_ = await transact;
  const addResult = await transact_.addResult;
  const rawQueryResult = await transact_.rawQueryResult;
  const pHash = bigString(await phash_);
  if (addResult != null) {
    const list: [path: S, id: number, radius: S][] = [
      [path, addResult as number, '-2'],
    ];

    const result = { pHash, name, list };
    if (log) console.log(result);
    return result;
  }
  if (isQueryResult(rawQueryResult)) {
    rawQueryResult.unshift([path, 0, '-1']);
    const list: [path: S, id: number, radius: S][] = rawQueryResult;
    const result = { pHash, name, list };
    if (log) console.log(result);
    return result;
  }
  return [path, 0, 'NaN'];
}

export async function phashNow(imgFile: FilePath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.path);
  const phash_: P<string> = phash(thisImage);
  return { phash_, index: index + 1, ...imgFile };
}

export function bigString(str: S): S {
  if (str.length === 64) return BigInt(`0b${str}`).toString();

  throw new Error(
    'Something bad happened. because the string was not 64 bit long'
  );
}
