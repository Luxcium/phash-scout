import { logError } from '../constants';
import { IMGSCOUT } from '../tools';

export async function syncPhash(R: any, k: string) {
  try {
    await R.sendCommand([IMGSCOUT.SYNC, k]);
    return true;
  } catch (error) {
    logError(String(error));
  }
  return false;
}
