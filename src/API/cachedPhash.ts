import { immediateZalgo } from '../utils';
import { SET } from './_TraverseDirs2';

// HACK:  caching pHash in redis -------------------------------------

export async function cachedPhash(
  RC: any,
  k_FullPath: string,
  getValueFnct: (fullPath: string) => Promise<string>
) {
  const K = `'cachedPhash:${k_FullPath}'`;
  const R = await RC;

  // const EXISTS = await R.EXISTS(K);
  // console.log(`R.EXISTS(${K}) == ${EXISTS} :>>`, EXISTS == 1);
  let value = await R.GET(K);
  if (
    value !== null &&
    value !== 10 &&
    value !== 1 &&
    value !== 0 &&
    value !== 2
  ) {
    return immediateZalgo(value) as Promise<string>;
  }
  value = getValueFnct(k_FullPath);
  SET(R, K, value);
  return immediateZalgo(value) as Promise<string>;
}
