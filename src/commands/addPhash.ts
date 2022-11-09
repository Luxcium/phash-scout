import { IMGSCOUT } from '../tools';
import { pHsCardKey, phSetKey, phTitleKey } from '../tools/redis/keys';

const VERBOSA3 = false;
export async function addPhash(
  redis: any,
  key: string,
  pHash: string,
  title: string
): Promise<number> {
  const result = await Promise.all([
    // HACK: remove hardcoded name:
    redis.sendCommand(['SADD', `${phSetKey(pHash)}`, title]),
    redis.sendCommand(['SCARD', `${phSetKey(pHash)}`]),
    redis.sendCommand([IMGSCOUT.ADD, key, pHash, title]),
  ]);

  // HACK: remove hardcoded name:
  const awaiter = [
    redis.sendCommand(['SET', `${phTitleKey(title)}`, String(result[2])]),
  ];

  const cardinality = result[1];
  if (Number(cardinality) > 1) {
    await zaddPhash(cardinality, pHash, redis);
    VERBOSA3 && console.log('SCARD', cardinality, pHash);
  }
  await Promise.all(awaiter);

  return result[2];
}

export async function zaddPhash(cardinality: any, pHash: string, redis: any) {
  const ZADD = 'ZADD';
  // HACK: remove hardcoded name:
  const KEY = pHsCardKey();
  const SCORE = String(Number(cardinality) || -1);
  const MEMBER = phSetKey(pHash);
  return redis.sendCommand([ZADD, KEY, SCORE, MEMBER]);
}

// export async function sadd(redis: any) {
//   return redis.sendCommand(['SADD', `set:pHs#${pHash}`, title]);
// }

export const commandBuilder = (commandName: string) => {
  return commandName;
};
