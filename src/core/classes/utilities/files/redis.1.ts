import { Tedis } from 'tedis';
import { timeoutZalgo } from '..';
import { BoxedAsyncGenerator, BoxedGenerator } from '../..';
import { BASE_SRC_PATH5 } from './devePaths';
import { getDirs } from './fs';
import { getStat } from './getStats';
export const REDIS_PREFIX = 'JSON::un-named::GBT_PATH:';

export const getNewTedis = (port = 6382, host = '127.0.0.1') =>
  new Tedis({
    host,
    port,
  });

const counts = {
  a1: 0,
  b1: 0,
  c1: 0,
  d1: 0,
  b2: 0,
  c2: 0,
  d2: 0,
};
void BoxedGenerator;
void BoxedAsyncGenerator;

tedisStuff(BASE_SRC_PATH5, getNewTedis());

export async function tedisStuff(path_: string, tedis: Tedis) {
  const dirList = getDirs(path_);

  const aGenBox = BoxedGenerator.of(...dirList.slice(0, 4)).map(dirname => {
    counts.a1++;
    console.log(counts);
    return [`${REDIS_PREFIX}::${path_}/${dirname}`, `${path_}/${dirname}`];
  });
  const bGenBox = (await timeoutZalgo(1, aGenBox)).map(async ([k, p]) => {
    const key = k;
    const path = '.';
    counts.b1++;
    console.log(counts);
    const json = `${JSON.stringify(await getStat(p))}`;
    counts.b2++;
    console.log(counts);
    return ['JSON.SET', key, path, json];
  });
  const cGenBox = (await timeoutZalgo(1, bGenBox)).map(async a => {
    counts.c1++;
    console.log(counts);
    const result = tedis.command(...(await a));
    counts.c2++;
    console.log(counts);
    // nextTickZalgo();
    return result;
  });

  const dGenBox = (await timeoutZalgo(1, cGenBox)).map(async x => {
    counts.d1++;
    console.log(counts);
    const awaitedX = await x;
    counts.d2++;
    console.log(counts, awaitedX);
  });

  await Promise.all((await timeoutZalgo(1, dGenBox)).unbox());

  return tedis.close();
}
// BoxedAsyncGenerator
