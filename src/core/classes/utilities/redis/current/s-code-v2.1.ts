import { readdir, stat } from 'fs/promises';
import path from 'path';
import { BASE_SRC_PATH1 } from '../../../../../constants/devPaths';
import type { RedisClientType } from '../../../../types';
import { redisCreateClient } from '../tools';
import { getKeywords } from './getKeywords.1';
import { getShortWordList } from './getShortWordList';
import { getxDir } from './getxDir';
import { statsReducer } from './statsReducer';
let STEPS = 1000000;
let smallCount = 0;
let turns = 10000;
export const tooShort = getShortWordList(); // ['in'];
const X4D = '${X4D}';

type WriterTool = (
  redisClient: RedisClientType,

  userDirName: any
) => Promise<any[]>;
const count = { users: 0, coll: 0, filles: 0 };

const total = { users: 0, coll: 0, filles: 0 };

export function getSpiderFolder(
  redisClient: RedisClientType,
  writerTool: WriterTool
) {
  return async function spiderFolder(folderPath: string) {
    try {
      count.users = 1;
      const returnList = [];
      const users = await readdir(folderPath, {
        withFileTypes: true,
      });
      // ---------------------------------------------------------------//!!-----
      for (const _user of users.slice(0, STEPS)) {
        try {
          if (_user.isDirectory()) {
            count.coll = 0;
            count.users++;
            total.users++;
            const user = {
              path: `${folderPath}/${_user.name}`,
              name: _user.name,
            };
            returnList.push(
              redisClient.SET(`${X4D}:PATH:USERS:${user.name}`, user.path)
            );
            returnList.push(redisClient.SADD('${X4D}:SETS:USERS', user.name));

            const collections = await readdir(user.path, {
              withFileTypes: true,
            });

            // ---------------------------------------------------------//!!-----
            for (const _coll of collections) {
              try {
                if (_coll.isDirectory()) {
                  count.filles = 0;
                  count.coll++;
                  total.coll++;
                  const coll = {
                    path: `${user.path}/${_coll.name}`,
                    name: _coll.name,
                  };
                  returnList.push(
                    redisClient.SET(
                      `${X4D}:PATH:COLLECTIONS:${coll.name}`,
                      coll.path
                    )
                  );
                  const elements = await readdir(coll.path, {
                    withFileTypes: true,
                  });

                  // ---------------------------------------------------//!!-----
                  for (const _element of elements) {
                    try {
                      if (_element.isFile()) {
                        const filePath = `${coll.path}/${_element.name}`;
                        const fileName = _element.name;
                        const countTotal = `¹${total.users} ²${total.coll}(${
                          count.coll
                        }) ³${++total.filles}(${++count.filles})`;
                        returnList.push(
                          redisClient.SET(
                            `${X4D}:PATH:FILES:${fileName}`,
                            filePath
                          )
                        );

                        const result = writerTool(redisClient, {
                          filePath,
                          coll,
                          user,
                          fileName,
                          countTotal,
                        });
                        returnList.push(result);
                      }
                    } catch (error) {
                      console.error('at unfolding files:\n\n', error);
                      console.error(
                        '\n-------------------------------------------\n'
                      );
                    }
                  }
                }
              } catch (error) {
                console.error('at unfolding collections:\n\n', error);
                console.error(
                  '\n-------------------------------------------------\n'
                );
              }
            }
          }
        } catch (error) {
          console.error('at unfolding users:\n\n', error);
          console.error(
            '\n-------------------------------------------------------\n'
          );
        }
      }

      return Promise.all(returnList);
    } catch (error) {
      console.error('at await Promise.all(returnList) or in that scope');
      return [];
    }
  };
}
export const WriterTool: WriterTool = async (
  redisClient: RedisClientType,

  options: any
) => {
  const awaitList = [];
  const o = options;
  const uriRoot = '${X004D}';
  const pathStr = o.filePath;
  const parsed = path.parse(pathStr);
  const keywords = getKeywords(o.coll.name);
  const xDir = getxDir(o.coll.name);

  const stats = await stat(o.filePath);
  const moreStats = statsReducer(stats);

  try {
    awaitList.push(
      redisClient.ZINCRBY('${X4D}:SETS:COLLECTIONS:FILECOUNT', 1, o.coll.name)
    );
    if (keywords.length > 0) {
      awaitList.push(
        Promise.allSettled(
          keywords.map(item =>
            redisClient.ZINCRBY('${X4D}:SETS:KEYWORDS:RANKING', 1, item)
          )
        )
      );
    }
  } catch (error) {
    console.error(`in unfolding files elements:`);
    console.error(
      `at redisClient.SADD('${X4D}:SETS:KEYWORDS', ${keywords || ['']}):\n\n`,
      error
    );
    console.error('\n-----------------------------------------------\n');
  }

  const { name, ext } = parsed;
  const fileInfo = {
    keywords,
    coll: o.coll.name,
    userDirName: o.user.name,
    uriRoot,
    xDir,
    name,
    ext: ext.slice(1),
    ...moreStats,
    size: stats.size,
    currentCount: o.countTotal,
  };

  const newKey = `${X4D}:INFO:${fileInfo.xDir}:${fileInfo.ext}:${fileInfo.name}`;

  smallCount++;
  if ((turns !== 0 && smallCount % turns === 1) || turns === 1) {
    console.log(fileInfo);
  }

  awaitList.push(redisClient.json.set(`${newKey}`, '$', fileInfo as string));
  return Promise.allSettled(awaitList);
};

async function runApplication(port: number, dbNumber: number, _path: string) {
  try {
    //
    const client = redisCreateClient({ port, dbNumber });
    await client.connect();
    //
    await Promise.all(
      (
        await getSpiderFolder(client, WriterTool)(_path)
      ).flatMap(
        async item => (Array.isArray(item) && (await Promise.all(item))) || item
      )
    );
    //
    await client.quit();
    //
  } catch (e) {
    //
    console.error('at runApplication:\n\n', e);
    //
  }
}

const PATH = BASE_SRC_PATH1;
const PORT = 6382;
const DB_NUMBER = 0;
runApplication(PORT, DB_NUMBER, PATH);
