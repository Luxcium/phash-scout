import { statSync } from 'fs-extra';
import path from 'path';
import { immediateZalgo } from '../../../../../utils';
import { BoxedGenerator } from '../../../BoxedGenerator';
import { devPaths } from '../../files';
import {
  dirListWithFileTypeSync,
  getDirsSync,
  getFilesSync,
  getListingsSync,
} from '../../files/tools';
import { jsonGet, jsonSet, RDSServer_6382 } from '../jsonRedis';
import { replaceStr } from './replaceStr';
const PREFIX = 'TESTING:001::JSON:REDIS';
const STEPS = 1;
const DEBUG = 3;
const countx = {
  c1: 0,
  c2: 0,
  jsonSeted: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
};
const count = {
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  result: 0,
};

function setTheSith(withPrefix: any, jsonSet6382: any, server_6382: any) {
  console.log('setTheSith');
  return async (fInfos: any) => {
    if (DEBUG > 5) console.log('fInfos: count.c6:', count.c6++);
    const fullKey = withPrefix(fInfos);
    const jsonPath = '.';
    const jsonSeter = jsonSet6382(fullKey)(jsonPath);
    const jsonFinfo = `${JSON.stringify(fInfos)}`;
    if (DEBUG > 3)
      console.log({
        fullKey,
      });
    if (DEBUG > 4)
      console.log({
        jsonPath,
      });
    if (DEBUG > 5) console.log({ count, countx });
    if (DEBUG > 6)
      console.log({
        jsonFinfo,
      });
    return (async () => {
      try {
        console.log('inside setTheSith at fInfos');
        const jsonSeted = await immediateZalgo(jsonSeter(jsonFinfo));
        countx.jsonSeted++;
        const result = await jsonGet(server_6382.tedis, fullKey, jsonPath);
        count.result++;
        if (DEBUG > 2)
          console.log('jsonSetted:', {
            jsonSeted,
            jsonPath,
            fullKey,
            result: result.toString(),
            resultCount: count.result,
          });
        return { fullKey, jsonSeted };
      } catch (error) {
        console.error('error:', error, {
          fullKey,
          jsonSeted: error,
          jsonPath,
          jsonFinfo,
        });
        if (DEBUG > 1) console.error('jsonFinfo:', jsonFinfo);
        return server_6382.tedis.close();
      }
    })();
  };
}
main;
main().then(fulfilledResult => fulfilledResult.spark());
async function main() {
  // console.log(__filename);
  const server_6382 = RDSServer_6382();
  const jsonSet6382 = jsonSet.forFullKey(server_6382.tedis);

  const getShortKey = ({ xDir, name }: { xDir: string; name: string }) =>
    `${xDir}::${name}`;
  const withPrefix = (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;

  const fulfilled = await workingFunction({ DEBUG });

  const fulfilledResult = fulfilled
    .unSparkedGen()
    .map(users => {
      if (DEBUG > 7) console.log('users: count.c3:', count.c3++);
      return users.map(collections => {
        if (DEBUG > 6) console.log('collections: count.c4:', count.c4++);
        return collections.map(fInfos =>
          setTheSith(withPrefix, jsonSet6382, server_6382)(fInfos)
        );
      });
    })
    .map(l1 => {
      count.c1++;
      if (DEBUG > 2) console.log('L1: count.c1:', count.c1);
      return l1
        .map(l2 => {
          count.c2++;
          if (DEBUG > 2) console.log('L2: count.c2:', count.c2);
          return l2.map(async l3 => {
            if (DEBUG > 1) console.log('l3:', l3);
            return l3;
          });
        })
        .map(l2 => {
          if (DEBUG > 2) console.log('l2.spark()');
          return l2.spark();
        });
    })
    .map(l1 => {
      if (DEBUG > 2) console.log('l1.spark()');
      return l1.spark();
    });
  if (DEBUG > 2) console.log('fulfilledResult.spark()');

  return fulfilledResult;
}

async function workingFunction(opts: { DEBUG: number }) {
  const pathToShorten = devPaths.X004D;
  const shorthenTo = '${X004D}';
  const srtPath = replaceStr(pathToShorten, shorthenTo);
  countx.c1++;
  if (DEBUG > 1) console.log('workingFunction:', countx.c1);
  let count = 0;
  let count2 = 0;
  let count3 = 0;

  const userPathsGen = BoxedGenerator.of(
    ...[devPaths.PATH1]
      .flatMap(p => {
        countx.c2++;
        if (DEBUG > 2) console.log('userPathsGen:', countx.c2);

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
    const length = dirsSync.length;
    ++count;
    count2 += length;
    if (DEBUG > 4)
      console.log(
        'collectionsPathsGen:',
        countx.c4++,
        'dirsSync.length',
        length
      );

    const collectionLevelGen = dirsSync.map(dir => {
      if (DEBUG > 4) console.log('collectionLevelGen:', countx.c5++);

      const collctn = {
        fullPath: `${user.fullPath}/${dir}`,
        shortName: dir,
      };

      const somedirListWithFileTypeSync = [
        ...dirListWithFileTypeSync(collctn.fullPath),
      ];

      const listings = getListingsSync(collctn.fullPath);
      const getThisFileType = (f: string) =>
        somedirListWithFileTypeSync.filter(item => item.fileName === f)[0];

      /**
       * for each collections list contained files f
       */
      const filesPathsGen = BoxedGenerator.of(
        ...getFilesSync(collctn.fullPath)
      );

      const filesInfoGenerator = filesPathsGen.map(f => {
        //
        const pathStr = `${collctn.fullPath}/${f}`;
        //
        const stats = statSync(pathStr);
        const dirname = path.dirname(pathStr);
        const parsed = path.parse(pathStr);
        const dir = srtPath(parsed.dir);
        const displaycount = `¹${count} ²${count2} ³${count3++}`;
        //
        const fileInfo = {
          ...stats,
          ...listings.count,
          ...getThisFileType(f),
          dirname: srtPath(dirname),
          extname: path.extname(pathStr),
          isAbsolute: path.isAbsolute(pathStr),
          normalized: srtPath(path.normalize(pathStr)),
          ...parsed,
          dir,
          toNamespacedPath: srtPath(path.toNamespacedPath(pathStr)),
          userDirName: user.shortName,
          collectionDirName: collctn.shortName,
          keywords: collctn.shortName
            .split('-')
            .filter(csn => csn !== '')
            .filter(csn => isNaN(csn as unknown as number))
            .filter(csn => csn.length > 1)
            .slice(0, -1)
            .sort()
            .sort((a, b) => b.length - a.length),
          xDir: collctn.shortName
            .split('-')
            .filter(csn => csn !== '')
            .slice(-1)[0],
          fileName: f,
          displaycount,
        };

        if (opts.DEBUG > 5) console.log(`${f}:`, fileInfo);
        return fileInfo;
      });

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

  // const inerMostSparkedGen = () =>
  //   collectionsPathsGen.map(iner =>
  //     iner.map(inermost => {
  //       sparkedStatus.inermostGen = true;
  //       return inermost.spark();
  //     })
  //   );

  // const inerSparkedGen = () =>
  //   inerMostSparkedGen().map(iner => {
  //     sparkedStatus.inerGen = true;
  //     return iner.spark();
  //   });

  // const spark = () => {
  //   sparkedStatus.sparkedGen = true;
  //   return inerSparkedGen().spark();
  // };
  const unSparkedGen = () => {
    sparkedStatus.unSparkedGen = true;
    return collectionsPathsGen;
  };
  return {
    unSparkedGen,
    // inerMostSparkedGen,
    // inerSparkedGen,
    // spark,
    // sparkedStatus,
  };
}
