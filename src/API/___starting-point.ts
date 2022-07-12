import * as fs from 'node:fs/promises';
import path, { join } from 'node:path';
import { doUniqueAddObj } from '../doUniqueAddObj';
import { rConnect } from '../rConnect';
import { getPathInfos } from '../tools';
import { getBigStrPHashFromFile } from '../tools/computePHash';

const CSI = '\u009B';

// const argvs = process.argv.slice(2);
// void argvs;
const Rc = rConnect();

const traverse = async (dir: string) => {
  const subfolders = (await isDir(dir)) && (await fs.readdir(dir));

  if (subfolders) {
    doSomethingWithPath(dir, subfolders);

    for (let i = 0, length = subfolders.length; i < length; i += 1) {
      const path = subfolders[i];
      const fullPath = join(dir, path);
      await traverse(fullPath);
    }
  }
};
const count = { a: 0, b: 0 };
export async function doSomethingWithPath(dir: string, subfolders: string[]) {
  count.b = 0;
  subfolders.map(async item => {
    const fullPath = join(dir, item);
    const pathInfos = getPathInfos(fullPath).parsed();
    const extname = pathInfos.ext.toLowerCase();

    if (extname !== '.jpeg' && extname !== '.jpg') {
      return;
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
        doUniqueAddObj(await Rc, grpKey, infosToAdd);
        console.log(
          '>  fullPath',
          `'"${path.normalize(fullPath)}"'`,
          '\u009B0K\u009B0m\u009B1F'
        );
        return true;
      } else {
        console.error(
          '\u009B1m<\u009B0m \u009B90m skip file at:\u009B0m',
          `\u009B90m"'${path.normalize(fullPath)}'"\u009B0m\n`
        );
        return false;
      }
    } else {
      console.error(
        '\u009B9m>  Skip due to fullPath `isDirectory`\u009B0m\u009B7m',
        fullPath,
        '\u009B0m\u009B1F\n'
      );
      return null;
    }
  });
}
export function insertLine(Ps = 1) {
  console.log(CSI + Ps + 'L', '\u009B1F');
}
export function deleteLine(Ps = 1) {
  console.log(CSI + Ps + 'M', '\u009B1F');
}

export function scroll(Ps = -1) {
  if (Ps < 0) {
    // SU Scroll Up `CSI Ps S` Scroll Ps lines up (default=1).
    console.log(CSI + Ps * -1 + 'S', '\u009B1F');
  } else if (Ps > 0) {
    // SD Scroll Down `CSI Ps T` Scroll Ps lines down (default=1).
    console.log(CSI + Ps + 'T', '\u009B1F');
  } else {
    // DEFAULT: Scroll Down `CSI Ps T` Scroll down 1 lines.
    console.log(CSI + 1 + 'T', '\u009B1F');
  }
  return;
}

export const scrollUp = (Ps = 1) => scroll(Ps * -1);
export const scrollDown = (Ps = 1) => scroll(Ps);

const traverseDir =
  '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users';
(async function main_() {
  await traverse(traverseDir);
})();
/*
 const thisImage = fs.promises.readFile(imgFile.fullPath);
      return {
        await: {
          getPHash: async () => {
            return immediateZalgo({
              pHash: bigString(sharpPhash(await thisImage)),
              exclude: false,
            });
          },
        },
      };
 */

async function isDir(dir: string) {
  const stats = await fs.stat(dir);
  return stats.isDirectory();
}

// console.log('\nfullPath', fullPath, '\u009B2F', '\u009B3J'); // \u009B31m
// console.log(infosToAdd, '\u009B1F'); // , '\u009B7F', '\u009B1J', '\u009B1F');
// console.log('\u009B9mfullPath', fullPath, '\u009B0m\u009B1F');
// scroll(7);
// scroll(-8);
// console.log('fullPath', fullPath, '\u009B1E');
// console.log('\u009B7m\u009B9mfullPath', fullPath, '\u009B1F');
// const redisQuerry = doRedisQuery(Rc, grpKey);
// redisQuerry;
// return globalMain(fullPath, grpKey, validExtentions, Rc);
