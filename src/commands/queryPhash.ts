import { RADIUS } from '../constants/radius';
import { IMGSCOUT, immediateZalgo } from '../tools';
import { syncPhash } from './syncPhash';

export async function queryPhash(
  R: any,
  k: string,
  phash_: string,
  radius: string = RADIUS,
  failSilently = true,
  keys: any
) {
  const keys_ = keys(k);
  try {
    const R_EXISTS = await immediateZalgo(keys_ || R.EXISTS(k));
    if (R_EXISTS === 1) {
      await syncPhash(R, k);
      const result = R.sendCommand([IMGSCOUT.QUERY, k, phash_, radius]);
      return result;
    }
    console.error(`R.EXISTS(${k}) -> ${R_EXISTS} ... keys.list[k]:${keys_}`);
  } catch (error: any) {
    if (!failSilently) throw new Error('at: queryPhash →' + error);
    console.error('\u009B31mqueryPhash Failled silently\u009B0m');
  }
  return [];
}
