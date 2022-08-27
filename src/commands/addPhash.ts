import { IMGSCOUT } from '../tools';

const VERBOSA3 = false;
export async function addPhash(
  redis: any,
  key: string,
  pHash: string,
  title: string
): Promise<number> {
  const result = await Promise.all([
    // HACK: remove hardcoded name:
    redis.sendCommand(['SADD', `set:pHs#${pHash}`, title]),
    redis.sendCommand(['SCARD', `set:pHs#${pHash}`]),
    redis.sendCommand([IMGSCOUT.ADD, key, pHash, title]),
  ]);

  // HACK: remove hardcoded name:
  const awaiter = [
    redis.sendCommand(['SET', `pHs:ids:t#${title}`, String(result[2])]),
  ];

  const cardinality = result[1];
  if (Number(cardinality) > 1) {
    await zaddPhash(cardinality, pHash, redis);
    VERBOSA3 && console.log('SCARD', cardinality, pHash);
  }
  await Promise.all(awaiter);

  return result[2];
}
async function zaddPhash(cardinality: any, pHash: string, redis: any) {
  const ZADD = 'ZADD';
  // HACK: remove hardcoded name:
  const KEY = `set:pHs:cards`;
  const SCORE = String(Number(cardinality) || -1);
  // HACK: remove hardcoded name:
  const MEMBER = `set:pHs#${pHash}`;
  return redis.sendCommand([ZADD, KEY, SCORE, MEMBER]);
}
