import { VERBOSA } from '../constants';
import { isDir } from '../tools';
import { doTraverseDirs } from './directory-traversal';
import { sideFunctionBuilder } from './sideFunctionBuilder';

const MULTI = false;
function main() {
  const counts = { await: 0 };
  dirList.map(async traverseDir => {
    const times: number[] = [];
    if (await isDir(traverseDir)) {
      const sideFunction = sideFunctionBuilder(
        times,
        MULTI,
        VERBOSA.sideFunction
      );
      await doTraverseDirs(traverseDir, sideFunction, counts);
    }
  });
}

const dirList = ['/media/luxcium/Archive_Locale/import/'];

main();
