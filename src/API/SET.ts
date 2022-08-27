import { immediateZalgo } from '../tools';

export async function SET(
  R: any,
  K: string,
  value: Promise<string> | string,
  PX?: number
) {
  return (await R.SET(K, await immediateZalgo(value), { PX })) === 'OK';
}
