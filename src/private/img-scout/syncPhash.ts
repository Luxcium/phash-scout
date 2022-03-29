import { SYNC } from '.';

export async function syncPhash(
  R: any,
  k: string,
  failSilently: boolean = true
) {
  try {
    await R.sendCommand([SYNC, k]);
    return true;
  } catch (error) {
    if (!failSilently) console.log(error);
  }
  return false;
}
