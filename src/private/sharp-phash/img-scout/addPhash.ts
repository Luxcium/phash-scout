import { ADD } from '.';

export async function addPhash(
  R: any,
  k: string,
  p: string,
  t: string
): Promise<number> {
  return R.sendCommand([ADD, k, p, t]);
}
