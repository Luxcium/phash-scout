import { DirentWithFileType } from '../../core/types';
import { S } from '../../core/types/IQueryListPhash';
import { filter, getCurrentPath, immediateZalgo } from '../../core/utils';
import { asyncDirListWithFileType } from '../files';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { phashNow } from './phashNow';
import { querryAndAdd } from './querryAndAdd';
import { readListR1 } from './readListR1';
import { willLog } from './willLog';
main().then().catch(console.error);
// f => ({ folder, path: `${folder}/${f.fileName}`, name: f.fileName
// (parameter) f: DirentWithFileType
const currentPath = (folder: S) => (f: DirentWithFileType) =>
  getCurrentPath(f, folder);
async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');
  const filesList = asyncDirListWithFileType(folder);
  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();
  const filesPathList = (await filesList)
    .map(currentPath(folder))
    .filter(filter.fileType.file)
    .map(phashNow)
    .map(async r1 => {
      const { fileName, phash_, fullPath, index, pathToFile, type } = await r1;
      const result = {
        fileName,
        fullPath,
        pathToFile,
        type,
        phash_,
        index,
      };

      if (phash_ == null) {
        return { transact: immediateZalgo(null), ...result };
      }
      const transact = querryAndAdd(R, `TEST:${pathToFile}`, phash_, fullPath);

      return { transact, ...result };
    })
    .map(async tx => {
      const log: Promise<{
        pHash: string | null;
        fileName: string;
        list: [fullPath: string, id: number, radius: string][];
      }> = willLog(tx);
      const r = { log, tx };
      return r;
    })
    .map(async r2 => {
      const awaited = await r2;

      const { transact, fileName, phash_, fullPath, index } = await awaited.tx;
      return {
        transact: {
          rawQueryResult: (await (await transact)?.rawQueryResult) || null,
          addResult: (await (await transact)?.addResult) || null,
        },
        fileName,
        phash_,
        fullPath,
        index,
        folder,
        listing: await awaited.log,
      };
    })

    .map(async r => {
      const awaitedR = await r;
      readListR1(awaitedR.listing, awaitedR.fullPath, awaitedR.index);
      return r;
    });

  const allfilesPathList = Promise.all(filesPathList);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
