'use strict';
import { commands } from '.';
import { isPreviousStepQueryResult } from './isPreviousStepQueryResult';

export async function redisPhashQueryResult(imgFileAbsPath) {
  const prevStep = await commands.redis_phash_query(imgFileAbsPath);
  if (!isPreviousStepQueryResult(prevStep)) {
    return [];
  }
  const queryResult = await prevStep.queryResult();
  console.log(queryResult);
  return { ...prevStep, queryResult };
}
