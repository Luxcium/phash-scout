import { IMGSCOUT } from '../tools';

export async function syncPhash(redis: any, key: string): Promise<boolean> {
  // SEND COMMAND: IMGSCOUT.SYNC -------------------------------------
  await redis.sendCommand([IMGSCOUT.SYNC, key]);
  return true;
}
