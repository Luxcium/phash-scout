export async function SET(
  R: any,
  K: string,
  value: Promise<string>,
  PX?: number
) {
  return (await R.SET(K, await value, { PX })) === 'OK';
}
