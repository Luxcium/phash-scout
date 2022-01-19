import path from 'path';
import { immediateZalgo } from '../../../../../../utils';
import { BoxedGenerator } from '../../../../BoxedGenerator';
import { devPaths } from '../../../files';
import {
  dirListWithFileTypeSync,
  getDirsSync,
  getFilesSync,
  getListingsSync,
} from '../../../files/tools';
import { replaceStr } from '../replaceStr';
const PREFIX = 'TESTING:001::JSON:REDIS';
const STEPS = 100000;
const DEBUG = 0;
let COUNT = 0;

function setTheSith() {
  const getShortKey = ({ xDir, name }: { xDir: string; name: string }) =>
    `${xDir}::${name}`;
  const withPrefix = (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;

  return async (fInfos: any) => {
    const fullKey = withPrefix(fInfos);
    const jsonPath = '.';
    // const jsonSeter = jsonSet6382(fullKey)(jsonPath);
    const jsonFinfo = `${JSON.stringify(fInfos)}`;

    return (() => {
      try {
        // console.log('inside setTheSith at fInfos');

        void immediateZalgo, jsonFinfo;
        // LOG: MAIN LOGGER //++ !\!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log({ fullKey, jsonPath, fInfos, count: ++COUNT });
      } catch (error) {
        console.error({
          fullKey,
          jsonSeted: error,
          jsonPath,
          jsonFinfo,
        });
        // return server_6382.tedis.close();
      }
    })();
  };
}
main;
main().then(fulfilledResult => fulfilledResult.spark());
async function main() {
  // console.log(__filename);
  // const server_6382 = RDSServer_6382();
  // const jsonSet6382 = jsonSet.forFullKey(server_6382.tedis);

  const fulfilled = await workingFunction({ DEBUG });

  const fulfilledResult = fulfilled
    .unSparkedGen()
    .map(users => {
      return users.map(collections => {
        return collections.map(
          fInfos => setTheSith()(fInfos)
          // fInfos
        );
      });
    })
    .map(l1 => {
      return l1
        .map(l2 => {
          return l2.map(l3 => {
            return l3;
          });
        })
        .map(l2 => {
          return l2.spark();
        });
    })
    .map(l1 => {
      return l1.spark();
    });

  return fulfilledResult;
}

async function workingFunction(opts: { DEBUG: number }) {
  const { X004Da, X004Db } = devPaths;
  const shorthenTo = '${X004D}';
  const srtPath = (testString: string) =>
    replaceStr(X004Da, shorthenTo)(replaceStr(X004Db, shorthenTo)(testString));
  // let count = 0;
  // let count2 = 0;
  // let count3 = 0;
  opts;
  const userPathsGen = BoxedGenerator.of(
    ...[devPaths.PATH1]
      .flatMap(p => {
        return getDirsSync(p).map(dir => {
          // console.log('getDirsSync:', countx.c3++);

          return {
            fullPath: `${p}/${dir}`,
            shortName: dir,
          };
        });
      })
      .slice(0, STEPS)
  );

  const collectionsPathsGen = userPathsGen.map(user => {
    const dirsSync = BoxedGenerator.of(...getDirsSync(user.fullPath));
    // const length = dirsSync.length;

    const collectionLevelGen = dirsSync.map(dir => {
      const collctn = {
        fullPath: `${user.fullPath}/${dir}`,
        shortName: dir,
      };

      const somedirListWithFileTypeSync = [
        ...dirListWithFileTypeSync(collctn.fullPath),
      ];
      // HACK: remove teh dummy ()=>
      const listings = () => getListingsSync(collctn.fullPath);
      const getThisFileType = (f: string) =>
        somedirListWithFileTypeSync.filter(item => item.fileName === f)[0];
      void getThisFileType, listings;
      /**
       * for each collections list contained files f
       */
      const filesPathsGen = BoxedGenerator.of(
        ...getFilesSync(collctn.fullPath)
      );

      const filesInfoGenerator = filesPathsGen.map(
        f => {
          const pathStr = `${collctn.fullPath}/${f}`;
          const parsed = path.parse(pathStr);
          const dir = srtPath(parsed.dir);
          return {
            user: user.shortName,
            collectionName: collctn.shortName,
            fileName: f,
            ...parsed,
            dir,
            xDir: collctn.shortName
              .split('-')
              .filter(csn => csn !== '')
              .slice(-1)[0],
          };
        }
        // {
        //   //
        //   const pathStr = `${collctn.fullPath}/${f}`;
        //   //
        //   const stats = statSync(pathStr);
        //   const dirname = path.dirname(pathStr);
        //   const parsed = path.parse(pathStr);
        //   const dir = srtPath(parsed.dir);
        //   const displaycount = `¹${count} ²${count2} ³${count3++}`;
        //   //
        //   const fileInfo = {
        //     ...stats,
        //     ...listings.count,
        //     ...getThisFileType(f),
        //     dirname: srtPath(dirname),
        //     extname: path.extname(pathStr),
        //     isAbsolute: path.isAbsolute(pathStr),
        //     normalized: srtPath(path.normalize(pathStr)),
        //     ...parsed,
        //     dir,
        //     toNamespacedPath: srtPath(path.toNamespacedPath(pathStr)),
        //     userDirName: user.shortName,
        //     collectionDirName: collctn.shortName,
        //     keywords: collctn.shortName
        //       .split('-')
        //       .filter(csn => csn !== '')
        //       .filter(csn => isNaN(csn as unknown as number))
        //       .filter(csn => csn.length > 1)
        //       .slice(0, -1)
        //       .sort()
        //       .sort((a, b) => b.length - a.length),
        //     xDir: collctn.shortName
        //       .split('-')
        //       .filter(csn => csn !== '')
        //       .slice(-1)[0],
        //     fileName: f,
        //     displaycount,
        //   };

        //   if (opts.DEBUG > 5) console.log(`${f}:`, fileInfo);
        //   return fileInfo;
        // }
      );

      return filesInfoGenerator;
    });

    return collectionLevelGen;
    // return user.full;
  });

  const sparkedStatus = {
    unSparkedGen: false,
    sparkedGen: false,
    inerGen: false,
    inermostGen: false,
  };

  const unSparkedGen = () => {
    sparkedStatus.unSparkedGen = true;
    return collectionsPathsGen;
  };
  return {
    unSparkedGen,
  };
}
