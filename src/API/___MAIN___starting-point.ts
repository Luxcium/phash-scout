import { USEWORKER, VERBOSA } from '../constants';
import { isDir } from '../tools';
import { doTraverseDirs } from './directory-traversal';
import { sideFunctionBuilder } from './sideFunctionBuilder';

function main() {
  const counts = { await: 0 };
  dirList.map(async traverseDir => {
    const times: number[] = [];
    if (await isDir(traverseDir)) {
      const sideFunction = sideFunctionBuilder(
        times,
        USEWORKER,
        VERBOSA.sideFunction
      );
      await doTraverseDirs(traverseDir, sideFunction, counts);
    }
  });
}

const dirList = [
  '/tmp/jpgs',
  // '/media/luxcium/Archive_Locale/import/',
];

main();
