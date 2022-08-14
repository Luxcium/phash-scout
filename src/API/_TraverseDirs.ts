import { Dir } from 'node:fs';
import * as fs from 'node:fs/promises';
import { join } from 'node:path';

import {
  getBigStrPHashFromFile,
  getPathInfos,
  isDir,
  Nothing,
  Right,
} from '../tools';
import { doUniqueAddObj } from '../tools/doUniqueAddObj';
import { rConnect } from '../tools/redis';

export const count = { a: 1, b: 1, c: 1, d: 1 };
export const steps = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
  14: 1,
  15: 1,
  '5b': 1,
};
export const timeThen = Date.now();
export const timeNow = () => Date.now();
export const timeSinceThen = () => timeNow() - timeThen;
export const secondsSinceThen = () => timeSinceThen() / 1000;
export const myTimer001 = () => {
  const split = `${secondsSinceThen().toFixed(3)}`.split('.');
  const result = `${split[0] || '0'}.${(split[1] || '0').padEnd(3, '0')} sec.`;
  return result;
};

export const countWithTime = () => {
  const ms = timeSinceThen();
  const { a, b, c } = count;
  return {
    a: [count.a, (ms / a).toFixed(2)],
    b: [count.b, (ms / b).toFixed(2)],
    c: [count.c, (ms / c).toFixed(2)],
  };
};

const Rc = rConnect();

(async function main_(traverseDir: string) {
  if (await isDir(traverseDir)) {
    doTraverse(traverseDir);
  }
})('/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users');

export async function doTraverse(dir: string) {
  const subfolders_Open = await fs.readdir(dir);
  for (const subfolder of subfolders_Open) {
    const fullPath = join(dir, subfolder);
    const isDirectory = await isDir(fullPath);
    isDirectory ? doTraverse(fullPath) : doSomethingWithPath2(fullPath);
  }
}
export async function doTraverseDirs__(dir: string) {
  const subfolders_Open: Dir = await fs.opendir(dir);
  if (subfolders_Open) {
    for await (const subfolder of subfolders_Open) {
      const isDirectory = subfolder.isDirectory();
      const shortPath = subfolder.name;
      const fullPath = join(dir, shortPath);
      isDirectory ? doTraverseDirs__(fullPath) : doSomethingWithPath2(fullPath);
    }
  }
}

export async function doSomethingWithPath2(fullPath: string) {
  const infos = getPathInfos(fullPath).parsed();
  const extname = infos.ext.toLowerCase();
  const pathInfos = {
    ...infos,
    fullPath,
    extname,
  };

  const ms = timeSinceThen();
  const result = [[count.a, (ms / count.a).toFixed(2)], fullPath];
  console.log(...result);

  count.a++;
  // HACK:+-----------------------------------------------------------
  if (extname !== '.jpeg' && extname !== '.jpg') {
    return Nothing.of('extname !== .jpeg or .jpg');
  }
  const grpKey = 'x00Traverse';
  const pHash = await getBigStrPHashFromFile(fullPath);
  if (pHash) {
    const infosToAdd = {
      dir: pathInfos.dir,
      fullPath,
      pHash,
      baseName: pathInfos.base,
      extname,
    };
    return Right.of(doUniqueAddObj(await Rc, grpKey, infosToAdd));
  } else {
    return Nothing.of(
      `\u009B1m<\u009B0m \u009B90m skip file at:\u009B0m \u009B90m"'${fullPath}'"\u009B0m\n`
    );
  }
}

export function doForWithUniquePath(fullPath: string) {
  const ms = timeSinceThen();
  const result = [[count.a, (ms / count.a).toFixed(2)], fullPath];
  count.a++;
  console.log(...result);
  return fullPath;
}

// export async function doSomethingWithPath2(fullPath: string) {
//   const infos = getPathInfos(fullPath).parsed();
//   const extname = infos.ext.toLowerCase();
//   const pathInfos = {
//     ...infos,
//     fullPath,
//     extname,
//   };

//   const ms = timeSinceThen();
//   const result = [[count.a, (ms / count.a).toFixed(2)], fullPath];
//   console.log(...result);

//   count.a++;
//   // HACK:+-----------------------------------------------------------
//   if (extname !== '.jpeg' && extname !== '.jpg') {
//     return Nothing.of('extname !== .jpeg or .jpg');
//   }
//   const grpKey = 'x00Traverse';
//   const pHash = await getBigStrPHashFromFile(fullPath);
//   if (pHash) {
//     const infosToAdd = {
//       dir: pathInfos.dir,
//       fullPath,
//       pHash,
//       baseName: pathInfos.base,
//       extname,
//     };
//     return Right.of(doUniqueAddObj(null /* await Rc */, grpKey, infosToAdd));
//   } else {
//     return Nothing.of(
//       `\u009B1m<\u009B0m \u009B90m skip file at:\u009B0m \u009B90m"'${fullPath}'"\u009B0m\n`
//     );
//   }
// }

// export async function doTraverse(dir: string) {
//   const subfolders_Open: string[] = await fs.readdir(dir);
//   for (const subfolder of subfolders_Open) {
//     const fullPath = join(dir, subfolder);
//     const isDirectory = await isDir(fullPath);
//     isDirectory ? doTraverse(fullPath) : doForWithUniquePath(fullPath);
//   }
// }
