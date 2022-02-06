import { RedisCommandRawReply } from '@node-redis/client/dist/lib/commands';
import fs from 'fs';
import { asyncDirListWithFileType } from '../../files';
import { redisCreateClient } from '../tools';
import { shortBit64 } from './shortBit64';

const phash = require('sharp-phash');

const CURRENT_PATH = '/home/luxcium/WSD_250/jpgs_ipn_impt_2022-02-04';

type FilePath = {
  folder: string;
  path: string;
  name: string;
};

main3; //();
async function main3(
  folder = CURRENT_PATH,
  port = 6383,
  dbNumber = 0,
  host = '0.0.0.0'
) {
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();

  const images = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });
  const addPhash = (k: string, phash_: string, title: string) =>
    R.sendCommand(['IMGSCOUT.ADD', k, phash_, title]);
  const getExt = (fileName: string) =>
    fileName.split('.').slice(-1)[0].toLowerCase();

  for (const image of images.slice(0)) {
    if (image.isFile()) {
      const imgPath = `${folder}/${image.name}`;
      const imgExt = getExt(image.name);

      const imgFullPath = {
        imgPath,
        imgExt,
      };

      const isValidExt = ['jpg', 'jpeg', 'png'].some(
        ex => ex === imgFullPath.imgExt
      );

      if (isValidExt) {
        const thisImage = await fs.promises.readFile(imgPath);
        const phash_ = await phash(thisImage);
        // HACK:%----------------------------------------------------------------
        console.log(`${await addPhash(`TEST:${image.name}`, phash_, imgPath)}`);

        console.log();
        console.log(shortBit64(phash_));
        console.log(imgPath);
        console.log(phash_);
        console.log(image.name);
      }
    }
  }
}

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

  const addPhash = async (k: string, phash_: Promise<string>, title: string) =>
    R.sendCommand(['IMGSCOUT.ADD', k, await phash_, title]);

  addPhash;
  const filesPathList = (await filesList)
    .filter(i => i.isFile)
    .map(f => ({ folder, path: `${folder}/${f.fileName}`, name: f.fileName }))
    .map(phashNow)
    .map(async r => {
      const awaited = await r;
      const { name, phash_, path, index, folder } = awaited;
      const transact = addPhash(`TEST:${folder}`, phash_, path);
      return { transact, name, phash_, path, index, folder };
    })
    .map(async tx => {
      willLog(tx);
      return tx;
    })
    .map(async r => {
      const awaited = await r;
      const { transact, name, phash_, path, index } = awaited;
      return {
        transact: await transact,
        name,
        phash_: await phash_,
        path,
        index,
        folder,
      };
    });

  type TX = Promise<{
    transact: Promise<RedisCommandRawReply>;
    name: string;
    phash_: Promise<string>;
    path: string;
    index: number;
  }>;

  async function willLog(tx: TX) {
    const awaited = await tx;
    const { transact, name, phash_ } = awaited;
    console.log(await phash_, name, await transact);
  }
  const allfilesPathList = Promise.all(filesPathList);

  return await allfilesPathList.then(async val => {
    await R.QUIT();
    return val;
  });
}

export async function phashNow(imgFile: FilePath, index: number) {
  const thisImage = await fs.promises.readFile(imgFile.path);
  const phash_: Promise<string> = phash(thisImage);
  return { phash_, index, ...imgFile };
}

// const currentMs = Date.now() - timeMS;
//   count.totalCount++;
//   count.totalTime += currentMs;
//   timeMS = Date.now();
// index;
// const currentAvg = count.totalTime / count.totalCount;
// currentAvg;

// const diff = `${Math.round(currentMs - currentAvg)}`.padStart(5);
// `${currentMs}ms (${Math.round(currentAvg)} ms)`,
// diff
// console.log(phash_, imgFile.name.toLowerCase().padEnd(35), index);
// }
main2; //();
function main2() {
  const img1 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d65f45e97830.jpeg'
  );
  const img2 = fs.readFileSync(
    '/home/luxcium/WSD_250/images/full-14564-for-ian/jpgs/5d309a40f2014.jpeg'
  );
  const img3 = fs.readFileSync(
    '/home/luxcium/.local/src/parallel-mapping/scripts/assets/Lenna-sepia.jpg'
  );
  const img4 = fs.readFileSync(
    '/home/luxcium/src/parallel-mapping/scripts/assets/xing.jpg'
  );
  // 1110011001111011100110011000110011110001011010100100111100100101
  Promise.all([phash(img1), phash(img2), phash(img3), phash(img4)]).then(
    ([hash1, hash2, hash3, hash4]) => {
      // hash returned is 64 characters length string with 0 and 1 only
      // assert(dist(hash1, hash2) < 5);
      // assert(dist(hash2, hash3) < 5);
      // assert(dist(hash3, hash1) < 5);
      // assert(dist(hash3, hash4) < 5);
      // (async () => console.log(await phash(img1)))();
      (async () => console.log(hash1))();
      (async () => console.log(hash2))();
      (async () => console.log(hash4))();
      (async () => console.log(distance(hash1, hash2)))();
      (async () => console.log(distance(hash2, hash3)))();
      (async () => console.log(distance(hash3, hash1)))();
      (async () => console.log(distance(hash3, hash4)))();
    }
  );
}

export function distance(a: string, b: string) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      count++;
    }
  }
  return count;
}
