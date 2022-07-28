import { redisQuery } from '../doRedisQuery';
import { getBigStrPHashFromFile } from '../tools';
import { SideFunctionParam } from '../types';
import { averageReducer } from './averageReducer';
import { getCachedPhash } from './getCachedPhash';

export function sideFunctionBuilder(RC: any, times: number[]) {
  return async ({ fullPath, count, DEBUGS }: SideFunctionParam) => {
    DEBUGS &&
      process.stdout.write(
        `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${averageReducer(
          times
        ).toFixed(2)} > \u009B37m${fullPath}\u009B0m\n`
      );
    const cachedPhash = getCachedPhash(RC, fullPath, getBigStrPHashFromFile);
    const redisQueryResult = redisQuery(RC, 'key', fullPath, cachedPhash);
    // console.log(
    //   'redisQueryResult.queryResult() :>>',
    /* await */ redisQueryResult.queryResult();
    // );
    return redisQueryResult;
  };
}
