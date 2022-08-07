import { getPhash } from '../tools';
import { listFiles } from '../tools/listFiles';
import { doRedisQuery } from '../tools/redis/doRedisQuery';
import { manageRedisQuery } from '../tools/redis/manageRedisQuery';
import { endAsyncSpark } from '../tools/endAsyncSpark';
import { filterExtensions } from '../tools/filterExtensions';

export const globalMain = async (dir: S, grpKey: S, validExt: Ss, rC: any) => {
  const R = await rC;

  const filterValidExts = filterExtensions(validExt);
  const redisQuery = doRedisQuery(R, grpKey);
  const asyncSpark = endAsyncSpark(R, 'Error in step0 to step5');

  const step0 = dir;

  const step1 = listFiles(step0);
  void step1;
  const step2 = filterValidExts;
  void step1;
  void step2;
  const step3 = getPhash;
  await step1
    .map(it => {
      console.log('it', it);
      return it;
    })
    .asyncSpark();
  const step4 = redisQuery;
  void step3;
  const step5 = manageRedisQuery;
  void step4;
  const stepN = asyncSpark;
  void step5;
  // const step3 = getPhash(step2);
  // const step4 = redisQuery(step3);
  // const step5 = manageRedisQuery(step4);
  // const stepN = asyncSpark(step5);
  return stepN;
};

type S = string;
type Ss = Set<S>;
