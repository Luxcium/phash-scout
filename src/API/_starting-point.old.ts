import { readdirSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import path, { join } from 'node:path';

import { getPathInfos, isDir, isDirSync, Nothing, Right } from '../tools';
import { getBigStrPHashFromFile } from '../tools/computePHash';
import { doUniqueAddObj } from '../tools/doUniqueAddObj';
import { rConnect } from '../tools/rConnect';
import { SideFunctionParam } from '../types';
import { immediateZalgo } from '../utils';
import { getCachedPhash } from './getCachedPhash';
import { doTraverseDirs } from './sync-directory-traversal';

const flags = {
  isOpenDirSYNC: true,
  isReadSYNC: true,
  isCloseDirSYNC: false,
  VERBOSE: false,
  DEBUGS: true,
  AWAITS: false,
};

const Rc = () => rConnect();

void (async function main_(traverseDir: string) {
  if (await isDir(traverseDir)) {
    const RC = Rc();
    const sideFunction = ({ fullPath, count, DEBUGS }: SideFunctionParam) => {
      DEBUGS &&
        process.stdout.write(
          `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m \u009B37m${fullPath}\u009B0m\n`
        );
      return getCachedPhash(RC, fullPath, getBigStrPHashFromFile);
    };
    doTraverseDirs(traverseDir, sideFunction, flags, { await: 0 });
  }
})('/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users');
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

const traverseDir =
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users';
// console.log('step')
export const CSI = '\u009B';

// XXX: traverseForMap
// XXX: traverseForFor //
// XXX: traverseForForSync
(async function main_() {
  // console.log('step 1', steps[1]++);
  if (await isDir(traverseDir)) {
    traverseOpenDirForFor(traverseDir);
  }
  // console.log('step last');
}); //();

export async function traverseOpenDirForFor(dir: string) {
  // const subfolders = (await isDir(dir)) && (await fs.readdir(dir));
  const subfolders_Open = await fs.opendir(dir);
  if (subfolders_Open) {
    for await (const subfolder of subfolders_Open) {
      const isDirectory = subfolder.isDirectory();
      const path = subfolder.name;
      const fullPath = join(dir, path);
      if (isDirectory) {
        traverseOpenDirForFor(fullPath);
      } else {
        doForWithUniquePath(console.log, fullPath);
      }
    }
  }
}
function doForWithUniquePath(fn: any, fullPath: string) {
  const ms = timeSinceThen();
  const result = [[count.a, (ms / count.a).toFixed(2)], fullPath]; //
  count.a++;
  fn(...result);
  return result;
}
export async function traverseForFor(dir: string) {
  const subfolders = (await isDir(dir)) && (await fs.readdir(dir));

  if (subfolders) {
    doForWithPath(console.log)(dir, subfolders);
    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      const path = subfolders[i];
      const fullPath = join(dir, path);
      if (await isDir(fullPath)) {
        traverseForFor(fullPath);
      }
    }
  }
}

// if (subfolders) {
//   doForWithPath(console.log)(dir, subfolders);
//   for (let i = 0, length = subfolders.length; i < length; i += 1) {
//     const path = subfolders[i];
//     const fullPath = join(dir, path);
//     if (await isDir(fullPath)) {
//       traverseForFor(fullPath);
//     }
//   }
// }

export function traverseForForSync(dir: string) {
  const subfolders = isDirSync(dir) && readdirSync(dir);
  if (subfolders) {
    doForWithPathSync(console.log)(dir, subfolders);
    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      const path = subfolders[i];
      const fullPath = join(dir, path);
      if (isDirSync(fullPath)) {
        traverseForFor(fullPath);
      }
    }
  }
}
export function doForWithPathSync(fn: any) {
  return (dir: string, subfolders: string[]) => {
    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      doPathSync(subfolders[i], dir, fn);
    }
  };
}
export function doPathSync(path: string, dir: string, fn: any) {
  const fullPath = join(dir, path);
  const isDirectory = isDirSync(fullPath);
  if (!isDirectory) {
    return log(fn, fullPath);
  }
  return `Dir: ${fullPath}`;
}
export function doForWithPath(fn: any) {
  return async (dir: string, subfolders: string[]) => {
    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      await doPath(subfolders[i], dir, fn);
    }
  };
}
async function doPath(path: string, dir: string, fn: any) {
  const fullPath = join(dir, path);
  const isDirectory = await isDir(fullPath);
  if (!isDirectory) {
    return immediateZalgo(log(fn, fullPath));
  }
  return immediateZalgo(`Dir: ${fullPath}`);
}
function log(fn: any, fullPath: string) {
  const ms = timeSinceThen();
  const result = [[count.a, (ms / count.a).toFixed(2)], fullPath]; //
  count.a++;
  fn(...result);
  return result;
}
export function doMapWithPath(fn: any) {
  return async (dir: string, subfolders: string[]) => {
    return Promise.all(
      subfolders.map(async path => {
        return doPath(path, dir, fn);
      })
    );
  };
}
export async function traverseMapMap(dir: string): Promise<any> {
  console.log('step 2', steps[2]++);
  const subfolders = (await isDir(dir)) && (await fs.readdir(dir));
  console.log('step 3', steps[3]++);
  if (subfolders) {
    console.log('step 4', steps[4]++);
    await doMapWithPath(console.log)(dir, subfolders);
    console.log('step 5', steps[5]++);

    return Promise.all(
      subfolders.map(async path => {
        const fullPath = join(dir, path);
        console.log('step 6', steps[6]++);
        if (await isDir(fullPath)) {
          console.log('step 7', steps[7]++);
          return traverseMapMap(fullPath);
        }
        console.log('step 8', steps[8]++);
        return immediateZalgo(null);
      })
    );
  }
  console.log('step 9', steps[9]++);
  return immediateZalgo(null);
}
export async function traverseForMap(dir: string) {
  console.log('step 2', steps[2]++);
  const subfolders = (await isDir(dir)) && (await fs.readdir(dir));
  console.log('step 3', steps[3]++);
  if (subfolders) {
    console.log('step 4', steps[4]++);
    await doMapWithPath(console.log)(dir, subfolders);
    console.log('step 5', steps[5]++);

    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      const path = subfolders[i];
      const fullPath = join(dir, path);
      if (await isDir(fullPath)) {
        traverseForMap(fullPath);
      }
    }
  }
  return;
}
export async function traverseMapFor(dir: string): Promise<any> {
  console.log('step 2', steps[2]++);
  const subfolders = (await isDir(dir)) && (await fs.readdir(dir));
  console.log('step 3', steps[3]++);
  if (subfolders) {
    console.log('step 4', steps[4]++);
    doForWithPath(console.log)(dir, subfolders);
    console.log('step 5', steps[5]++);

    return Promise.all(
      subfolders.map(async path => {
        const fullPath = join(dir, path);
        if (await isDir(fullPath)) {
          return traverseMapFor(fullPath);
        }
        return immediateZalgo(null);
      })
    );
  }
  return immediateZalgo(null);
}

export async function doSomethingWithPath2(dir: string, subfolders: string[]) {
  count.b = 0;
  return subfolders.map(async item => {
    const fullPath = join(dir, item);
    const infos = getPathInfos(fullPath).parsed();
    const extname = infos.ext.toLowerCase();
    const pathInfos = {
      ...infos,
      fullPath,
      extname,
    };
    // HACK:+---------------------------------------------------------
    if (extname !== '.jpeg' && extname !== '.jpg') {
      return Nothing.of('extname !== .jpeg or .jpg');
    }
    const isDirectory = await isDir(fullPath);
    if (!isDirectory) {
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
        doUniqueAddObj(await Rc(), grpKey, infosToAdd);
        console.log(
          `>  fullPath: '"${path.normalize(
            fullPath
          )}"' \u009B0K\u009B0m\u009B1F`
        );
        return Right.of(true);
      } else {
        return Nothing.of(
          `\u009B1m<\u009B0m \u009B90m skip file at:\u009B0m \u009B90m"'${fullPath}'"\u009B0m\n`
        );
      }
    } else {
      return Nothing.of(
        `\u009B9m>  Skip due to fullPath 'isDirectory'\u009B0m\u009B7m ${fullPath} \u009B0m\u009B1F\n`
      );
    }
  });
}
