import { rConnect } from '../rConnect';
import { isDir, getBigStrPHashFromFile } from '../tools';
import { SideFunctionParam } from '../types';
import { doTraverseDirs } from './sync-directory-traversal';
import { cachedPhash } from './_TraverseDirs2';

const Rc = () => rConnect();

void (async function main_(traverseDir: string) {
  if (await isDir(traverseDir)) {
    const RC = Rc();
    const sideFunction = ({
      fullPath,
      ms,
      count,
      debug,
    }: SideFunctionParam) => {
      debug &&
        process.stdout.write(
          `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${(
            ms / count.a
          ).toFixed(3)}   \u009B37m${fullPath}\u009B0m\n`
        );
      return cachedPhash(RC, fullPath, getBigStrPHashFromFile);
    };
    doTraverseDirs(traverseDir, sideFunction);
  }
})('/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/users');
