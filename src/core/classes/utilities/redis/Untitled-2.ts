import { statSync } from 'fs-extra';
import path from 'path';
import { Tedis } from 'tedis';
import { devPaths } from '../files';
import {
  dirListWithFileTypeSync,
  getDirsSync,
  getFilesSync,
  getListingsSync,
} from '../files/tools';
import { jsonGet, jsonSet } from './jsonRedis';
const SUBSET = 100;
type SetJsonArgs = {
  prefix: string;
  jsonPath: string;
  keyID: string;
  value: string | number;
  RDSServer: Tedis;
};

export const prefix_: string = 'test_123b';
export async function setJson(A: SetJsonArgs) {
  const { prefix, jsonPath, keyID, value, RDSServer } = A;
  const shortKey = `${prefix}::${keyID}`;
  console.log(shortKey);
  const rootJsonPath = '.';
  const initialValue = `{}`;
  let setResult;
  try {
    if (null === (await jsonGet(RDSServer, shortKey, rootJsonPath))) {
      await jsonSet(RDSServer, shortKey, rootJsonPath)(initialValue);
    }
    setResult = await RDSServer.command(
      'JSON.SET',
      shortKey,
      jsonPath,
      `${value ?? '""'}`
    );
  } catch (error) {
    // LOG:
    console.error(error);
    console.log('JSON.SET');
    console.log(shortKey);
    console.log(jsonPath);
    console.log(`"${value ?? '""'}"`);
  }

  const getBackValue = await RDSServer.command('JSON.GET', shortKey, jsonPath);
  const results = {
    result: [setResult, getBackValue],
    redis: {
      command: 'JSON.SET',
      atKey: shortKey,
      atJsonPath: jsonPath,
      sentValue: `${value}`,
      setResult,
      getBackValue,
    },
  };
  // LOG:
  console.log(results);
  return results;
}

main1;
main1();
async function main1() {
  let count = 0;
  let count2 = 0;
  let count3 = 0;
  return [devPaths.PATH1]
    .flatMap(p =>
      getDirsSync(p).map(
        dir => ({ full: `${p}/${dir}`, short: dir }) /* `${p}/${dir}` */
      )
    )
    .slice(0, SUBSET)
    .map(user => {
      const dirsSync = getDirsSync(user.full);
      const length = dirsSync.length;
      const displaycount = `¹${++count} ²${(count2 += length)}`;
      return dirsSync
        .map(dir => ({ full: `${user.full}/${dir}`, short: dir }))
        .map(collectionDir => {
          console.log(displaycount, { ...collectionDir, userDir: user.short });
          count3;
          return collectionDir;
        })
        .map(collctn => {
          const getFile = getFilesSync(collctn.full);
          const somedirListWithFileTypeSync = [
            ...dirListWithFileTypeSync(collctn.full),
          ];
          const listings = getListingsSync(collctn.full);
          const getThisFileType = (f: string) =>
            somedirListWithFileTypeSync.filter(item => item.fileName === f)[0];
          getFile.map(f => {
            const pathStr = `${collctn.full}/${f}`;
            const dirname = path.dirname(pathStr);
            const stats = statSync(pathStr);
            const displaycount = `¹${count} ²${count2} ³${count3++}`;
            const fInfo = {
              // dirname:collctn,
              ...stats,
              ...listings.count,
              ...getThisFileType(f),
              dirname,
              extname: path.extname(pathStr),
              isAbsolute: path.isAbsolute(pathStr),
              normalized: path.normalize(pathStr),
              ...path.parse(pathStr),
              toNamespacedPath: path.toNamespacedPath(pathStr),
              userDirName: user.short,
              collectionDirName: collctn.short,
              keywords: collctn.short
                .split('-')
                .filter(csn => csn !== '')
                .sort()
                .slice(0, -1),
              xDir: collctn.short
                .split('-')
                .filter(csn => csn !== '')
                .slice(-1)[0],
              fileName: f,
              displaycount,
            };
            console.log(`${f}:`, fInfo);
            return fInfo;
          });
        });
      // return user.full;
    });
  // getDirs(k.full).length
  // dirListWithFileTypeSync;
  // getRawDirListSync;
  // getStatsSync;
  // getListingsSync;
  // getFilesSync;
  // getDirsSync;
}

// ++ VERRY IMPORTANT STUFF MUST NOT REMOVE ++++++++++++++++++++++++++++
/*
        .map(j => {
          const getFile = getFilesSync(j.full);
          const somedirListWithFileTypeSync = [
            ...dirListWithFileTypeSync(j.full),
          ];
          const getThisFileType = (f: string) =>
            somedirListWithFileTypeSync.filter(item => item.fileName === f)[0];
          getFile.map(f => {
            const pathStr = `${j.full}/${f}`;
            const dirname = path.dirname(pathStr);
            const stats = statSync(pathStr);
            console.log(`${f}:`, {
              currentCount: count3++,
              userDir: k.short,
              ...stats,
              ...getThisFileType(f),
              fileName: f,
              dirname,
              extname: path.extname(pathStr),
              isAbsolute: path.isAbsolute(pathStr),
              normalized: path.normalize(pathStr),
              ...path.parse(pathStr),
              toNamespacedPath: path.toNamespacedPath(pathStr),
              displaycount,
            });
            return f;
          });
        });
 */
// ++ VERRY IMPORTANT STUFF MUST NOT REMOVE ++++++++++++++++++++++++++++
//  const getAllStatsList: (stats: MyStats) => [string, any][] = (
//   stats: MyStats
// ) => [
//   ['.dev', stats.dev],
//   ['.ino', stats.ino],
//   ['.mode', stats.mode],
//   ['.nlink', stats.nlink],
//   ['.uid', stats.uid],
//   ['.gid', stats.gid],
//   ['.rdev', stats.rdev],
//   ['.size', stats.size],
//   ['.blksize', stats.blksize],
//   ['.blocks', stats.blocks],
//   ['.atimeMs', stats.atimeMs],
//   ['.mtimeMs', stats.mtimeMs],
//   ['.ctimeMs', stats.ctimeMs],
//   ['.birthtimeMs', stats.birthtimeMs],
//   ['.atime', async () => `${await stats.atime()}`],
//   ['.mtime', async () => `${await stats.mtime()}`],
//   ['.ctime', async () => `${await stats.ctime()}`],
//   ['.birthtime', async () => `${await stats.birthtime()}`],
//   // ['.mtime', stats.mtime],
//   // ['.ctime', stats.ctime],
//   // ['.birthtime', stats.birthtime],
// ];

// export function toManageItAll(RDSServer: Tedis, prefix: string) {
//   {
//     return function mappingFnct(key: string) {
//       const RDSServerStage2 = RDSServerJsonSetter(RDSServer)(prefix)(key);
//       getAllStatsList(getStats(key).eachStats).map(
//         async ([jPath, getValue]: [string, any]) => {
//           const value = await getValue();
//           if (value === 'null' || value === null) {
//             return RDSServerStage2(jPath)('null');
//           }
//           if (value === 'true' || value === true) {
//             return RDSServerStage2(jPath)('true');
//           }
//           if (value === 'false' || value === false) {
//             return RDSServerStage2(jPath)('false');
//           }
//           if (typeof value === 'number') {
//             return RDSServerStage2(jPath)(`${value}`);
//           }
//           return RDSServerStage2(jPath)(`"${value}"`);
//         }
//       );
//     };
//   }
// }

// export async function getRawDirList(pathSrc: string) {
//   const dirListing: Dirent[] = await readdir(pathSrc, {
//     withFileTypes: true,
//   });
//   return dirListing;
// }

// export function getStats(pathStr: string) {
//   let stats: null | Promise<Stats> = null;

//   async function _getStats() {
//     if (stats === null) {
//       try {
//         stats = stat(pathStr);
//       } catch (error) {
//         stats = stat('/');
//         console.error('DUMMY STATS FOR PATH', pathStr);
//       }
//     }
//     return immediateZalgo(stats);
//   }

//   return {
//     allStats: async () => await _getStats(),
//     eachStats: {
//       dev: async () => (await _getStats()).dev,
//       ino: async () => (await _getStats()).ino,
//       mode: async () => (await _getStats()).mode,
//       nlink: async () => (await _getStats()).nlink,
//       uid: async () => (await _getStats()).uid,
//       gid: async () => (await _getStats()).gid,
//       rdev: async () => (await _getStats()).rdev,
//       size: async () => (await _getStats()).size,
//       blksize: async () => (await _getStats()).blksize,
//       blocks: async () => (await _getStats()).blocks,
//       atimeMs: async () => (await _getStats()).atimeMs,
//       mtimeMs: async () => (await _getStats()).mtimeMs,
//       ctimeMs: async () => (await _getStats()).ctimeMs,
//       birthtimeMs: async () => (await _getStats()).birthtimeMs,
//       atime: async () => (await _getStats()).atime,
//       mtime: async () => (await _getStats()).mtime,
//       ctime: async () => (await _getStats()).ctime,
//       birthtime: async () => (await _getStats()).birthtime,
//     },
//   };
// }

// type MyStats2 = {
//   dev: () => Promise<number>;
//   ino: () => Promise<number>;
//   mode: () => Promise<number>;
//   nlink: () => Promise<number>;
//   uid: () => Promise<number>;
//   gid: () => Promise<number>;
//   rdev: () => Promise<number>;
//   size: () => Promise<number>;
//   blksize: () => Promise<number>;
//   blocks: () => Promise<number>;
//   atimeMs: () => Promise<number>;
//   mtimeMs: () => Promise<number>;
//   ctimeMs: () => Promise<number>;
//   birthtimeMs: () => Promise<number>;
//   atime: () => Promise<Date>;
//   mtime: () => Promise<Date>;
//   ctime: () => Promise<Date>;
//   birthtime: () => Promise<Date>;
// };

// main2;
// // main2();
// async function main2() {
//   // RDSServer_
//   const [server_6382, serverStop]: [Tedis, () => void] = RDSServer_6382();
//   server_6382;
//   serverStop;
//   const stage2Mapper: (key__: string) => void = toManageItAll(
//     server_6382,
//     prefix_
//   );

//   [
//     devPaths.PATH1,
//     devPaths.PATH2,
//     // devPaths.PATH3,
//     devPaths.PATH4,
//     devPaths.PATH5,
//     devPaths.PATH6a,
//     devPaths.PATH6b,
//   ]
//     .flatMap(p => getDirsSync(p))
//     .map(k => stage2Mapper(k));
// }

//   02:32:15

// export const RDSServerJsonSetter =
//   (RDSServer: Tedis) =>
//   (prefix: string) =>
//   (keyID: string) =>
//   (jsonPath: string) =>
//   (value: string | number) =>
//     setJson({ jsonPath, prefix, keyID, value, RDSServer: RDSServer });
