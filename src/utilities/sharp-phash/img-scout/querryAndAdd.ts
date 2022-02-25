import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { S } from '../../../core/types/IQueryListPhash';
import { immediateZalgo } from '../../../core/utils';
import { RADIUS } from '../constants';
import { isQueryResult } from '../isQueryResult';
import { addPhash } from './addPhash';
import { queryPhash } from './queryPhash';
import { syncPhash } from './syncPhash';

export async function querryAndAdd(
  R: any,
  k: S,
  phash_: S,
  title: S,
  radius: string = RADIUS
): Promise<{
  rawQueryResult: Promise<RedisCommandRawReply>;
  addResult: Promise<null | RedisCommandRawReply>;
}> {
  try {
    await syncPhash(R, k, false);
    const rawQueryResult: Promise<RedisCommandRawReply> = queryPhash(
      R,
      k,
      phash_,
      radius
    );
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
    console.error('Not yet similar have been indexed', title);
  }
  const addResult: Promise<RedisCommandRawReply> = addPhash(
    R,
    k,
    phash_,
    title
  );
  await syncPhash(R, k, false);
  const rawQueryResult: Promise<RedisCommandRawReply> = queryPhash(
    R,
    k,
    phash_
  );
  return {
    addResult,
    rawQueryResult,
  };
}
