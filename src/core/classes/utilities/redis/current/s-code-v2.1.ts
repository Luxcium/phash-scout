import { readdir, stat } from 'fs/promises';
import path from 'path';
import { createClient } from 'redis';
import { BASE_SRC_PATH1, devPaths } from '../../../constants/devPaths';
import { redisConnectionString } from '../tools';
import { replaceStr } from './replaceStr';

type RedisClientType = ReturnType<typeof createClient>;
type WriterTool = (
  redisClient: RedisClientType,

  userDirName: any
) => Promise<'OK' | null>;
const count = {
  users: 0,
  coll: 0,
  filles: 0,
};
const total = {
  users: 0,
  coll: 0,
  filles: 0,
};
export function getSpiderFolder(
  redisClient: RedisClientType,
  writerTool: WriterTool
) {
  return async function spiderFolder(folderPath: string) {
    count.users = 1;
    try {
      const users = await readdir(folderPath, {
        withFileTypes: true,
      });

      for (const _user of users) {
        if (_user.isDirectory()) {
          count.coll = 1;
          count.users++;
          total.users++;
          const user = {
            fullPath: `${folderPath}/${_user.name}`,
            shortName: _user.name,
          };
          const collections = await readdir(user.fullPath, {
            withFileTypes: true,
          });
          try {
            for (const _collctn of collections) {
              if (_collctn.isDirectory()) {
                count.filles = 1;
                count.coll++;
                total.coll++;
                const collctn = {
                  fullPath: `${user.fullPath}/${_collctn.name}`,
                  shortName: _collctn.name,
                };
                const elements = await readdir(collctn.fullPath, {
                  withFileTypes: true,
                });

                for (const _element of elements) {
                  if (_element.isFile()) {
                    const filePath = `${collctn.fullPath}/${_element.name}`;
                    const fileName = _element.name;
                    const displaycount = `${count.users} ${
                      count.coll
                    } ${count.filles++}`;
                    const countTotal = `¹${++total.filles} ²${total.coll}`;
                    displaycount;
                    await writerTool(redisClient, {
                      filePath,
                      collctn,
                      user,
                      fileName,
                      countTotal,
                      displaycount,
                    });
                  }
                }
              }
            }
          } catch (error) {
            console.error('at unfolding collections:\n', error);
          }
        }
      }
    } catch (error) {
      console.error('at unfolding users:\n', error);
    }
  };
}

export const WriterTool: WriterTool = async (
  redisClient: RedisClientType,

  options: any
) => {
  const o = options;
  const { X004Da, X004Db } = devPaths;
  const shorthenTo = '${X004D}';
  const srtPath = (testString: string) =>
    replaceStr(X004Db, shorthenTo)(replaceStr(X004Da, shorthenTo)(testString));
  const pathStr = o.filePath;
  const stats = await stat(o.filePath);
  const dirname = srtPath(path.dirname(pathStr));
  const shortFilePath = srtPath(o.filePath);
  const parsed = path.parse(pathStr);

  const infosAboutFile = {
    ...stats,
    dirname,
    extname: path.extname(pathStr),
    isAbsolute: path.isAbsolute(pathStr),
    normalized: srtPath(path.normalize(pathStr)),
    ...parsed,
    dir: srtPath(parsed.dir),
    userDirName: o.user.shortName,
    currentCount: o.displaycount,
    currentCountTotal: o.countTotal,
  };
  const shortKeyParts = `${shortFilePath.replaceAll('/', ':')}`
    // .replaceAll('-', ':') // :x_
    // .replaceAll('.', ':')
    .replaceAll(':x_', ':x_x_')
    .split(':x_');

  const fileExt = `${shortKeyParts[1].split('.')[1]}`;

  const shortKey = `${shortKeyParts[0]}:${fileExt}:${shortKeyParts[1]}`;

  // console.log(shortKey);
  console.log(infosAboutFile);

  const result = await redisClient.json.set(
    `${shortKey}`,
    '$',
    infosAboutFile as any as string
  );

  return result;
};

async function runApplication(port: number, dbNumber: number, _path: string) {
  try {
    const client = createClient(redisConnectionString({ port, dbNumber }));
    await client.connect();

    const spiderFolder = getSpiderFolder(client, WriterTool);
    await spiderFolder(_path);
    await client.quit();
  } catch (e) {
    console.error(e);
  }
}

const PATH = BASE_SRC_PATH1;
const PORT = 6382;
const DB_NUMBER = 0;
runApplication(PORT, DB_NUMBER, PATH);

// ---------------------------------------------------------------------//!!-----
// ++ Modified from: redis-json-directory-spider -----------------------
// https://github.com/simonprickett/redis-json-directory-spider/LICENSE
// + Copyright © 2022 Simon Prickett [MIT or MIT Like]

// if (dirEntry.isFile()) {
//   const filePath = `${folderPath}/${dirEntry.name}`;
//   await writerTool(redisClient, filePath, user.shortName);
// }
/* else if (dirEntry.isDirectory()) {
            await spiderFolder(`${folderPath}/${dirEntry.name}`);
          } */
