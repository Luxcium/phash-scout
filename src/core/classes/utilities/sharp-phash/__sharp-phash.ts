import { filterFiles } from '../../utils/filter/filterFiles';
import { asyncDirListWithFileType } from '../files';
import { redisCreateClient } from '../redis/tools';
import { CURRENT_PATH } from './constants';
import { phashNow } from './phashNow';
import { querryAndAdd } from './querryAndAdd';
import { readListR1 } from './readListR1';
import { willLog } from './willLog';
main().then().catch(console.error);
async function main(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  console.error('IN FUNCTION MAIN at:', __filename, '\n');
  const filesList = asyncDirListWithFileType(folder);
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();
  const filesPathList = (await filesList)
    .filter(filterFiles)
    .map(f => ({ folder, path: `${folder}/${f.fileName}`, name: f.fileName }))
    .map(phashNow)
    .map(async r1 => {
      const awaited = await r1;
      const { name, phash_, path, index, folder } = awaited;
      const transact = querryAndAdd(R, `TEST:${folder}`, phash_, path);
      return { transact, name, phash_, path, index, folder };
    })
    .map(async tx => {
      const log: Promise<{
        pHash: string;
        name: string;
        list: [path: string, id: number, radius: string][];
      }> = willLog(tx);
      const r = { log, tx };
      return r;
    })
    .map(async r2 => {
      const awaited = await r2;

      const { transact, name, phash_, path, index } = await awaited.tx;
      return {
        transact: {
          rawQueryResult: await (await transact).rawQueryResult,
          addResult: await (await transact).addResult,
        },
        name,
        phash_,
        path,
        index,
        folder,
        listing: await awaited.log,
      };
    })

    .map(async r => {
      const awaitedR = await r;
      readListR1(awaitedR.listing, awaitedR.path, awaitedR.index);
      return r;
    });

  const allfilesPathList = Promise.all(filesPathList);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}
