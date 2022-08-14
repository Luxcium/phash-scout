'use strict';
import { reduceQuerryResults } from '../../../tools';
import { commands } from '.';
import { isPreviousStepQueryResult } from './isPreviousStepQueryResult';

export async function redisPhashQueryResult(imgFileAbsPath) {
  try {
    const result = await commands.redis_phash_query(imgFileAbsPath);
    if (!isPreviousStepQueryResult(result)) {
      return [];
    }
    const queryResult = [...(await result.queryResult())];
    (queryResult.length > 1 &&
      console.log({
        queryResult: queryResult
          .map(reduceQuerryResults)
          .sort((a, b) => a.diff - b.diff)
          .sort((a, b) => b.radius - a.radius),
        length: queryResult.length,
      })) ||
      (false && console.log(['Skip']));
    return { ...result, queryResult };
  } catch (error) {
    throw error;
  }
}
