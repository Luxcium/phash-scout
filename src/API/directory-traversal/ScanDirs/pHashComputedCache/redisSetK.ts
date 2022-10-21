import { makePhashCacheKey } from './makePhashCacheKey';

export async function redisSetK(R: any, imgFileAbsPath: string, value: string) {
  const K = makePhashCacheKey(imgFileAbsPath);
  return R.SET(K, value).then((value: any) => value === 'OK');
}
