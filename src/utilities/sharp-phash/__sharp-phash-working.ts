import { stat } from 'fs-extra';
import { CURRENT_PATH } from '../../constants/radius';
import { BoxedGenerator } from '../../core';
import { WithExclude } from '../../packages/file-path/types/file-path-types';
import { getPathWithStats } from '../../packages/file-path/utils';
import { phashNow } from '../../packages/phash-now/phashNow';
import { immediateZalgo } from '../utils';
import type { PHashedPath } from './PHashedPath';

export { CURRENT_PATH };
export const validExts = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const count = { index1: 1 };

export async function listFiles(folder: string, withStats: boolean = false) {
  const pathList = BoxedGenerator.of(
    ...getPathWithStats(folder) /* .filter(i => !i.exclude) */
  );
  count.index1 = 1;
  const filesPathList = withStats
    ? pathList.map(async i => {
        const { fullPath } = await i;
        return immediateZalgo({
          ...(await i),
          ...(await stat(fullPath)),
        });
      })
    : pathList.map(async i => immediateZalgo(i));
  const filteredExts = filesPathList.map(async i => {
    const awaited_i = await i;
    const { ext } = awaited_i;
    return immediateZalgo({
      ...awaited_i,
      exclude: awaited_i.exclude || !validExts.has(ext),
    });
  });
  const pHashesBGen = filteredExts.map(async (paths, index) => {
    return phashNow(await paths, index || 0);
  });
  return pHashesBGen.map(async (hash: Promise<PHashedPath>) => {
    const { path, phash } = await hash;
    const phash_ = await phash.get();
    return { phash_, ...path, i: phash.index, count: count.index1++ };
  });
}
export async function main() {
  // const boxedGenerator = await listFiles(
  //   /* '/home/luxcium/Téléchargements', */
  //   // CURRENT_PATH,
  //   '/home/luxcium/Téléchargements/images Archives 001',
  //   true
  // );

  // const listFiles001 = await listFiles(
  //   '/home/luxcium/Téléchargements/images Archives 001',
  //   true
  // );

  // const listFiles002 = await listFiles(
  //   '/home/luxcium/Téléchargements/archives 002',
  //   true
  // );

  // const listFiles003 = await listFiles(
  //   '/home/luxcium/Téléchargements/Random images 800+',
  //   true
  // );
  // listFiles001;
  // listFiles002;
  // listFiles003;
  const listFiles004 = await listFiles(CURRENT_PATH);
  // /home/luxcium/Téléchargements/animes
  const boxedGenerator2 = BoxedGenerator.of(
    // ...listFiles001.unbox(),
    // ...listFiles002.unbox(),
    // ...listFiles003.unbox(),
    ...listFiles004.unbox()
  );
  // boxedGenerator;
  const count = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 1,
  };
  void count;
  return boxedGenerator2
    .map(async item => {
      if (await notExcludeAsync(item)) console.log(await item);
      return item;
    })
    .map(i => i)

    .spark();
}
main();

export function notExclude(item: WithExclude) {
  return !item.exclude;
}

export function notExcludeList(item: WithExclude[]) {
  return item.filter(notExclude);
}

export async function notExcludeAsync(item: Promise<WithExclude>) {
  return !(await item).exclude;
}
