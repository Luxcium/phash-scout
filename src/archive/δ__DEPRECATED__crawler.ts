import { BoxedGenerator } from '@luxcium/boxed-list';

import { filterDirectories } from '../tools';
import { listFiles } from '../tools/paths';

let count = 0;
let count1 = 0;
let count2Total = 0;
let count2 = 0;
let childCount = 0;
const step1 = listFiles(
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users'
);
step1
  .map(async pr => pr.getChild().map(async e => console.log(await e)))
  .spark();

const step2 = step1.map(async pathWithStats => {
  const preload_001 = filterDirectories(pathWithStats);
  const awtPathWStats = pathWithStats;
  count2++;
  BoxedGenerator.of(...awtPathWStats.getChild())
    .map(async (c, i) => {
      // HACK:
      process.stdout.write(
        `child item N°${++childCount} ${count2}/${count2Total} (${
          (i || 0) + 1
        })\n${await c}`
      );
      // console.log('child:', await c);
    })
    .spark();
  const step2a = listFiles(pathWithStats.fullPath);
  const step2b = step2a.map(async (subPathWithStats, j) => {
    const current = (j || 0) + 1;

    console.log('count:', top, current, ++count1);
    console.log('count:', top, current, ++count, subPathWithStats);
    return subPathWithStats;
  });
  preload_001 ? step2b.spark() : console.log(null);
  return pathWithStats;
});
step2.spark;
