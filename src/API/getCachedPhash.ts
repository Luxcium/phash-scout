import { immediateZalgo } from '../utils';
import { SET } from './_TraverseDirs2';

// HACK:  caching pHash in redis -------------------------------------

export async function getCachedPhash(
  RC: any,
  k_FullPath: string,
  getValueFnct: (fullPath: string) => Promise<string>
) {
  const K = `'cachedPhash:${k_FullPath}'`;
  const R = await RC;

  let value: Promise<string> | string = (await R.GET(K)) as string;
  if (value !== null && value.toString().length < 10) {
    return immediateZalgo(value);
  }
  // calling getBigStrPHashFromFile here:
  value = getValueFnct(k_FullPath);
  SET(R, K, value);
  return immediateZalgo(value);
}
