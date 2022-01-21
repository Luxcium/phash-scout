import { devPaths } from '../../files';
import { getDirsSync } from '../../files/tools';
import { replaceStr } from './replaceStr';

export const getShortKey = ({ xDir, name }: { xDir: string; name: string }) =>
  `${xDir}::${name}`;
export const withPrefix =
  (PREFIX: string) => (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;

const { X004Da, X004Db } = devPaths;
const shorthenTo = '${X004D}';

export const srtPath = (testString: string) =>
  replaceStr(X004Da, shorthenTo)(replaceStr(X004Db, shorthenTo)(testString));

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
