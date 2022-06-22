import { doRedisQuery } from './doRedisQuery';
import { endAsyncSpark } from './endAsyncSpark';
import { newFilterExtensions } from './filterExtensions';
import { newGetPHash } from './getFilesWithPHash';
import { newListFiles } from './listFiles';
import { manageRedisQuery } from './manageRedisQuery';

export const globalMain = async (dir: S, grpKey: S, validExt: Ss, rC: any) => {
  const R = await rC;

  const filterValidExts = newFilterExtensions(validExt);
  const redisQuery = doRedisQuery(R, grpKey);
  const asyncSpark = endAsyncSpark(R, 'Error in step0 to step5');

  const step0 = dir;

  const step1 = newListFiles(step0);
  const step2 = filterValidExts(step1);
  const step3 = newGetPHash(step2);
  const step4 = redisQuery(step3);
  const step5 = manageRedisQuery(step4);
  const stepN = asyncSpark(step5);

  return stepN;
};

type S = string;
type Ss = Set<S>;
