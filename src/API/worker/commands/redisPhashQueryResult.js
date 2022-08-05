'use strict';
import { commands } from '.';
import { isPreviousStepQueryResult } from './isPreviousStepQueryResult';

export async function redisPhashQueryResult(imgFileAbsPath) {
  const result = await commands.redis_phash_query(imgFileAbsPath);
  if (!isPreviousStepQueryResult(result)) {
    return [];
  }
  const queryResult = await result.queryResult();
  console.log(queryResult);
  return { ...result, queryResult };
}
