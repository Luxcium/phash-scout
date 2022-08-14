import { Dir } from 'node:fs';
import * as fs from 'node:fs/promises';
import { join } from 'node:path';

export const count = { a: 1 };

export const timeThen = performance.now();
export const timeNow = () => performance.now();
export const timeSinceThen = () => timeNow() - timeThen;

// const Rc = () => rConnect();

// void (async function main_(traverseDir: string) {
//   if (await isDir(traverseDir)) {
//     const RC = Rc();
//     const sideFunction = ({
//       fullPath,
//       ms,
//       count,
//       debug,
//     }: SideFunctionParam) => {
//       debug &&
//         process.stdout.write(
//           `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${(
//             ms / count.a
//           ).toFixed(3)} \u009B37m${fullPath}\u009B0m\n`
//         );
//       return cachedPhash(RC, fullPath, getBigStrPHashFromFile);
//     };
//     doTraverseDirs(traverseDir, sideFunction);
//   }
// })('/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users');

export async function doTraverseDirs_(absolutePath: string /* , RC: any */) {
  const subfolders_Open: Dir = await fs.opendir(absolutePath);
  if (subfolders_Open) {
    for await (const subfolder of subfolders_Open) {
      const isDirectory = subfolder.isDirectory();
      const shortPath = subfolder.name;
      const fullPath = join(absolutePath, shortPath);

      isDirectory
        ? doTraverseDirs_(fullPath /* , RC */)
        : doForWithUniquePath(fullPath /* , RC */);
    }
  }
}

export async function doForWithUniquePath(fullPath: string /* , RC: any */) {
  const ms = timeSinceThen();
  const result = [[count.a, (ms / count.a).toFixed(2)], fullPath];
  count.a++;
  // const pHash = cachedPhash(RC, fullPath, getBigStrPHashFromFile);
  // console.log(await pHash);
  console.log(...result);
  return; // cachedPhash(RC, fullPath, getBigStrPHashFromFile);
}
