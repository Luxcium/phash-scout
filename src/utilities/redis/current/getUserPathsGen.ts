import { devPaths } from '../../files';
import { getDirsSync } from '../../files/file-path/tools';

export function getUserPathsGen(STEPS: number) {
  return [devPaths.PATH1]
    .flatMap(p => {
      return getDirsSync(p).map(dir => {
        // console.log('getDirsSync:', countx.c3++);
        return {
          fullPath: `${p}/${dir}`,
          shortName: dir,
        };
      });
    })
    .slice(0, STEPS);
}
