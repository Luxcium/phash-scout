import { filterDirectories } from '../../packages/file-path/utils';
import { listFiles } from './listFiles';

let count = 0;
let count1 = 0;
let count2 = 0;
const step1 = listFiles(
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users/un-named'
);
const step2 = step1.map(async (pathWithStats, i) => {
  const top = (i || 0) + 1;
  const preload_001 = filterDirectories(await pathWithStats);
  console.log('preload_001:', preload_001, count2++);
  const child = (await pathWithStats).getChild();
  child.map(async c => console.log('child:', await c));
  const step2a = listFiles((await pathWithStats).fullPath);
  const step2b = step2a.map(async (subPathWithStats, j) => {
    const current = (j || 0) + 1;

    console.log('count:', top, current, ++count1);
    console.log('count:', top, current, ++count, await subPathWithStats);
    return subPathWithStats;
  });
  preload_001 ? step2b.spark() : console.log(null);
  return pathWithStats;
});
step2.spark();
