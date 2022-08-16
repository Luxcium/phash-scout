import { N, S } from '$types/';

import { IMGSCOUT } from '../tools';
import { syncPhash } from './syncPhash';

export async function delPhash(R: any, k: S, id: N, failSilently = true) {
  try {
    const R_EXISTS = await R.EXISTS(k);
    if (R_EXISTS === 1) {
      await syncPhash(R, k);
      const result = R.sendCommand([IMGSCOUT.DEL, k, id]);
      return result;
    }
    console.error(`R.EXISTS(${k}) -> ${R_EXISTS}`);
  } catch (error: any) {
    if (!failSilently) throw new Error('queryPhash' + error);
    console.error('\u009B31mqueryPhash Failled silently\u009B0m');
  }
  return [];
}
export async function delPhash2(R: any, k: S, id: N, failSilently = true) {
  try {
    const R_EXISTS = await R.EXISTS(k);
    if (R_EXISTS === 1) {
      const commands = [syncPhash(R, k), R.sendCommand([IMGSCOUT.DEL, k, id])];
      const results = await Promise.all(commands);
      await syncPhash(R, k);
      // const result = R.sendCommand([IMGSCOUT.DEL, k, id]);
      return results[1];
    }
    console.error(`R.EXISTS(${k}) -> ${R_EXISTS}`);
  } catch (error: any) {
    if (!failSilently) throw new Error('queryPhash' + error);
    console.error('\u009B31mqueryPhash Failled silently\u009B0m');
  }
  return [];
}

export const delPhashKey =
  (R: any, k: S, failSilently = true) =>
  async (id: N) =>
    delPhash(R, k, id, failSilently);
