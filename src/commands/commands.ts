import { DB_NUMBER, logError, logHigh } from '../constants';
import { rConnect } from '../tools';
import { IMGSCOUT } from '.';

export const Rc = rConnect(null, DB_NUMBER, null);
export async function syncPhash(k: string) {
  try {
    const R = await Rc;
    const result = R.sendCommand([IMGSCOUT.SYNC, k]);
    logHigh(await result, 'syncPhash result:');
    return result;
  } catch (error) {
    logError(error, 'at: syncPhash');
    return false;
  }
}
