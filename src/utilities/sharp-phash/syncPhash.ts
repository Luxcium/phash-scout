import { S } from '../../core/types/IQueryListPhash';
import { SYNC } from './constants';

export async function syncPhash(R: any, k: S, failSilently: boolean = true) {
  try {
    await R.sendCommand([SYNC, k]);
    return true;
  } catch (error) {
    if (!failSilently) console.log(error);
  }
  return false;
}
