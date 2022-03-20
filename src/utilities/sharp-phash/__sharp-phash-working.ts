import { CURRENT_PATH } from '../../constants/radius';
import { BoxedGenerator } from '../../core';
import { filter, getPathWithStats } from '../../packages/file-path/utils';
import { phashNow } from '../../packages/phash-now/phashNow';
import type { PHashedPath } from './PHashedPath';

export async function listFiles(folder: string, withStats: boolean = false) {
  const count = { index1: 1 };
  const currentPathList = getPathWithStats(folder, withStats);
  const subPathList = [...currentPathList];
  const filesPathList = subPathList.filter(filter.fileType.file);
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
  const boxedGenerator = await listFiles(CURRENT_PATH);

  return boxedGenerator
    .map(async item => {
      console.log(await item);
      return item;
    })
    .spark();
}
main();
