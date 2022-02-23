import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import { P, S } from '../../core/types/IQueryListPhash';
import { immediateZalgo } from '../../core/utils';
import { addPhash } from './addPhash';
import { isQueryResult } from './isQueryResult';
import { queryPhash } from './queryPhash';
import { syncPhash } from './syncPhash';

export async function querryAndAdd(
  R: any,
  k: S,
  phash_: S,
  title: S
): P<{
  rawQueryResult: P<RedisCommandRawReply>;
  addResult: P<null> | P<null | RedisCommandRawReply>;
}> {
  try {
    await syncPhash(R, k);
    const rawQueryResult: P<RedisCommandRawReply> = queryPhash(
      R,
      k,
      phash_,
      '3'
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
    console.error(error);
  }
  const addResult: P<RedisCommandRawReply> = addPhash(R, k, phash_, title);
  await syncPhash(R, k);
  const rawQueryResult: P<RedisCommandRawReply> = queryPhash(R, k, phash_);
  return {
    addResult,
    rawQueryResult,
  };
}
