import { readdir, stat } from 'fs/promises';
import path from 'path';
import { createClient } from 'redis';
import { BASE_SRC_PATH1 } from '../../../constants/devPaths';
import { redisConnectionString } from '../tools';

let smallCount = 0;
const turns = 1000;
export const tooShort = getTooShortWords(); // ['in'];
let first = true;
const X4D = '${X4D}';

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
    const users = await readdir(folderPath, {
      withFileTypes: true,
    });

    // -----------------------------------------------------------------//!!-----
    for (const _user of users) {
      try {
        if (_user.isDirectory()) {
          count.coll = 0;
          count.users++;
          total.users++;
          const user = {
            fullPath: `${folderPath}/${_user.name}`,
            shortName: _user.name,
          };

          redisClient.SET(`${X4D}:PATH:USERS:${user.shortName}`, user.fullPath);
          await redisClient.SADD('${X4D}:SETS:USERS', user.shortName);
          const collections = await readdir(user.fullPath, {
            withFileTypes: true,
          });

          // -----------------------------------------------------------//!!-----
          for (const _collctn of collections) {
            try {
              if (_collctn.isDirectory()) {
                count.filles = 0;
                count.coll++;
                total.coll++;
                const collctn = {
                  fullPath: `${user.fullPath}/${_collctn.name}`,
                  shortName: _collctn.name,
                };

                redisClient.SET(
                  `${X4D}:PATH:COLLECTIONS:${collctn.shortName}`,
                  collctn.fullPath
                );
                const elements = await readdir(collctn.fullPath, {
                  withFileTypes: true,
                });
                first = true;

                // -----------------------------------------------------//!!-----
                for (const _element of elements) {
                  try {
                    if (_element.isFile()) {
                      const filePath = `${collctn.fullPath}/${_element.name}`;
                      const fileName = _element.name;
                      const countTotal = `¹${total.users} ²${total.coll}(${
                        count.coll
                      }) ³${++total.filles}(${++count.filles})`;
                      redisClient.SET(
                        `${X4D}:PATH:FILES:${fileName}`,
                        filePath
                      );
                      await writerTool(redisClient, {
                        filePath,
                        collctn,
                        user,
                        fileName,
                        countTotal,
                      });
                    }
                  } catch (error) {
                    console.error('at unfolding files elements:\n\n', error);
                    console.error(
                      '\n-----------------------------------------------\n'
                    );
                  }
                }
              }
            } catch (error) {
              console.error('at unfolding collections:\n\n', error);
              console.error(
                '\n-----------------------------------------------------\n'
              );
            }
          }
        }
      } catch (error) {
        console.error('at unfolding users:\n\n', error);
        console.error(
          '\n-----------------------------------------------------------\n'
        );
      }
    }
  };
}

export const WriterTool: WriterTool = async (
  redisClient: RedisClientType,

  options: any
) => {
  const o = options;
  // const { X004Da, X004Db } = devPaths;
  // HACK: Uniform Resource Identifier
  const shorthenTo = '${X004D}';
  // const srtPath = (testString: string) =>
  // replaceStr(X004Db, shorthenTo)(replaceStr(X004Da, shorthenTo)(testString));
  const pathStr = o.filePath;
  const stats = await stat(o.filePath);
  // const dirname = srtPath(path.dirname(pathStr));
  // const shortFilePath = srtPath(o.filePath);
  const parsed = path.parse(pathStr);

  const {
    size,
    blocks,
    dev,
    mode,
    nlink,
    uid,
    gid,
    rdev,
    blksize,
    ino,
    atime,
    mtime,
    ctime,
    birthtimeMs,
    birthtime,
    ...moreStats
  } = stats;

  const keywords = (o.collctn.shortName as string)
    .split('-')
    .filter(csn => csn !== '')
    .filter(csn => isNaN(csn as unknown as number))
    .filter(csn => csn.length > 1)
    .slice(0, -1)
    .filter(notIn => !tooShort.some(isIn => isIn === notIn))
    .sort()
    .sort((a, b) => a.length - b.length);

  const xDir = (o.collctn.shortName as string)
    .split('-')
    .filter(csn => csn !== '')
    .slice(-1)[0];

  if (keywords.length > 0) {
    try {
      await redisClient.SADD('${X4D}:SETS:KEYWORDS', keywords);
      await Promise.all(
        keywords.map(item =>
          redisClient.ZINCRBY('${X4D}:SETS:KEYWORDS:RANKING', 1, item)
        )
      );
      await redisClient.ZINCRBY(
        '${X4D}:SETS:COLLECTIONS:FILECOUNT',
        1,
        o.collctn.shortName
      );
    } catch (error) {
      if (first) {
        console.error('\n-----------------------------------------------\n');
        first = false;
      }

      //ZINCRBY
      console.error(`in unfolding files elements:`);
      console.error(
        `at redisClient.SADD('${X4D}:SETS:KEYWORDS', ${keywords || ['']}):\n\n`,
        error
      );
      console.error('\n-----------------------------------------------\n');
    }
  }

  const { name, ext } = parsed;
  const fileInfo = {
    keywords,
    collctn: o.collctn.shortName,
    userDirName: o.user.shortName,
    uriRoot: shorthenTo,
    xDir,
    name,
    ext: ext.slice(1),
    ...moreStats,
    size: stats.size,
    currentCount: o.countTotal,
  };

  const newKey = `${X4D}:INFO:${fileInfo.xDir}:${fileInfo.ext}:${fileInfo.name}`;

  smallCount++;
  if (smallCount % turns === 1) console.log(fileInfo);

  const result = await redisClient.json.set(
    `${newKey}`,
    '$',
    fileInfo as any as string
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
    console.error('at runApplication:\n\n', e);
  }
}

const PATH = BASE_SRC_PATH1;
const PORT = 6382;
const DB_NUMBER = 0;
runApplication(PORT, DB_NUMBER, PATH);

function getTooShortWords() {
  return [
    'ah',
    'am',
    'an',
    'as',
    'at',
    'be',
    'by',
    'do',
    'go',
    'ha',
    'he',
    'hi',
    'if',
    'in',
    'is',
    'it',
    'me',
    'my',
    'no',
    'of',
    'oh',
    'on',
    'or',
    'so',
    'to',
    'up',
    'us',
    'we',
    'act',
    'add',
    'ago',
    'air',
    'all',
    'and',
    'any',
    'are',
    'art',
    'ask',
    'beg',
    'bet',
    'bit',
    'but',
    'can',
    'cry',
    'day',
    'did',
    'due',
    'end',
    'far',
    'few',
    'fix',
    'fly',
    'for',
    'get',
    'got',
    'had',
    'has',
    'her',
    'hey',
    'him',
    'his',
    'hit',
    'hmm',
    'hop',
    'how',
    'hug',
    'huh',
    'its',
    'lap',
    'lay',
    'led',
    'let',
    'lit',
    'lot',
    'low',
    'mad',
    'may',
    'mum',
    'new',
    'nod',
    'nor',
    'not',
    'now',
    'odd',
    'off',
    'one',
    'our',
    'out',
    'own',
    'pat',
    'pay',
    'put',
    'ran',
    'rip',
    'rub',
    'sat',
    'saw',
    'say',
    'see',
    'set',
    'she',
    'sip',
    'sir',
    'sit',
    'sob',
    'sun',
    'tap',
    'the',
    'tip',
    'too',
    'try',
    'tug',
    'two',
    'use',
    'van',
    'war',
    'was',
    'way',
    'who',
    'why',
    'win',
    'wow',
    'yea',
    'yes',
    'yet',
    'you',
    'able',
    'also',
    'away',
    'back',
    'been',
    'best',
    'both',
    'call',
    'came',
    'come',
    'deep',
    'does',
    'done',
    'door',
    'down',
    'drop',
    'each',
    'else',
    'even',
    'ever',
    'feel',
    'fell',
    'felt',
    'find',
    'five',
    'four',
    'from',
    'gave',
    'give',
    'good',
    'grin',
    'hand',
    'hard',
    'have',
    'held',
    'help',
    'here',
    'hurt',
    'idea',
    'into',
    'jump',
    'just',
    'keep',
    'kept',
    'knew',
    'know',
    'last',
    'late',
    'lean',
    'left',
    'like',
    'line',
    'live',
    'long',
    'look',
    'love',
    'made',
    'make',
    'many',
    'mark',
    'mean',
    'mind',
    'mine',
    'more',
    'most',
    'move',
    'much',
    'must',
    'need',
    'next',
    'okay',
    'once',
    'only',
    'onto',
    'open',
    'over',
    'pick',
    'plan',
    'pull',
    'read',
    'rest',
    'roll',
    'room',
    'said',
    'same',
    'seat',
    'seem',
    'seen',
    'shut',
    'side',
    'sigh',
    'some',
    'soon',
    'sort',
    'stay',
    'step',
    'stop',
    'such',
    'sure',
    'take',
    'talk',
    'tear',
    'tell',
    'than',
    'that',
    'them',
    'then',
    'they',
    'this',
    'time',
    'told',
    'took',
    'turn',
    'very',
    'wait',
    'walk',
    'wall',
    'want',
    'wave',
    'well',
    'went',
    'were',
    'what',
    'when',
    'will',
    'with',
    'word',
    'work',
    'yeah',
    'year',
    'yell',
    'your',
    'about',
    'after',
    'again',
    'close',
    'could',
    'every',
    'first',
    'house',
    'laugh',
    'never',
    'other',
    'place',
    'right',
    'start',
    'still',
    'their',
    'there',
    'thing',
    'think',
    'voice',
    'watch',
    'where',
    'which',
    'while',
    'would',
    'always',
    'around',
    'before',
    'happen',
    'really',
    'though',
    'because',
    'thought',
    'through',
    'anything',
    'something',
  ];
} // ['in'];

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
