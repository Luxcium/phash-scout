import { VERBOSA } from '../constants';
import { isDir } from '../tools';
import { doTraverseDirs } from './directory-traversal';
import { sideFunctionBuilder } from './sideFunctionBuilder';

const count = {
  a: 0,
  b: 0,
};

const MULTI = true;
function main() {
  const counts = { await: 0 };
  dirList.map(async traverseDir => {
    const times: number[] = [];
    if (await isDir(traverseDir)) {
      const sideFunction = sideFunctionBuilder(
        times,
        MULTI,
        VERBOSA.sideFunction,
        count
      );
      await doTraverseDirs(traverseDir, sideFunction, counts);
    }
  });
}
const dir = '/home/luxcium/Téléchargements/telegram/chris/photos-x_copy';

const dirList = [dir];

main();
