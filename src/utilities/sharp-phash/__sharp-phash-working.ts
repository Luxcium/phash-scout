import { stat } from 'fs-extra';
import { CURRENT_PATH } from '../../constants/radius';
import { BoxedGenerator } from '../../core';
import { filter, getPathWithStats } from '../../packages/file-path/utils';
import { phashNow } from '../../packages/phash-now/phashNow';
import { immediateZalgo } from '../utils';
import type { PHashedPath } from './PHashedPath';

export { CURRENT_PATH };
export const validExts = new Set(['.png', '.jpeg']);
export async function listFiles(
  folder: string,
  withStats: boolean = false,
  filtertype = filter.fileType.file
) {
  const count = { index1: 1 };
  const currentPathList = getPathWithStats(folder);
  const subPathList = [...currentPathList];
  const xStep = subPathList.filter(filtertype);
  // const filteredExts = xStep.filter(async i => {
  //   const { extname } = await i;
  //   return validExts.has(extname);
  // }); // kharkiv
  const filesPathList = withStats
    ? xStep.map(async i => {
        const { fullPath } = await i;
        return immediateZalgo({
          ...(await i),
          ...(await stat(fullPath)),
        });
      })
    : xStep.map(async i => immediateZalgo(i));
  const filesPathBoxedGen = BoxedGenerator.of(
    ...(await Promise.all(filesPathList))
  );
  const pHashesBGen = filesPathBoxedGen.map((paths, index) => {
    return phashNow(paths, index || 0);
  });

  return pHashesBGen.map(async (hash: PHashedPath) => {
    const { path, phash } = hash;
    const phash_ = await phash.get();
    return { phash_, ...path, i: phash.index, count: count.index1++ };
  });
}

export async function main() {
  const boxedGenerator = await listFiles(
    '/home/luxcium/Téléchargements',
    false
  );

  return boxedGenerator
    .map(async item => {
      console.log(await item);
      return item;
    })
    .spark();
}
main();
