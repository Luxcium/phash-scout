import { Tedis } from 'tedis';
import { BASE_SRC_PATH2 } from '../constants/devPaths';
import { getDirs } from './fs';
import { getStat } from './getStats';
export const REDIS_PREFIX = 'JSON:GBT_PATH';

export const tedis_ = new Tedis({
  host: '127.0.0.1',
  port: 6382,
});

export async function tedisStuff(tedis: Tedis) {
  try {
    const dirList = getDirs(BASE_SRC_PATH2);
    const tedisDirListing = dirList
      .map(dirname => [
        `${REDIS_PREFIX}::${BASE_SRC_PATH2}/${dirname}`,
        `${BASE_SRC_PATH2}/${dirname}`,
      ])

      .map(([k, p]) => {
        const key = k;
        const path = '.';
        const json = `'${JSON.stringify(getStat(p))}'`;
        try {
          return tedis.command('JSON.SET', key, path, json);
        } catch (error: any) {
          console.log(`tedis.command('JSON.SET', ${key}, ${path}, ${json})`);
          return error.message;
        }
      });
    //  tedis.command('JSON.SET', k, p)
    await Promise.all(tedisDirListing);
    tedis.close();

    return;
  } catch (error) {
    tedis.close();
    console.log(error);
    return;
  }
}
tedisStuff(tedis_);

// async function tedisStuff2(tedis: Tedis) {
//   console.log(await tedis.command('JSON.SET', 'mykey', 'hello tedis'));
//   return tedis.close();
// }
// tedisStuff2(tedis_);
// fs.statSync(p);
//

console.log();
export function getRedisPrefix() {
  return (() => REDIS_PREFIX)();
}
// tedis.hdel;
// tedis.hexists;
// tedis.hget;
// tedis.hgetall;
// tedis.hincrby;
// tedis.hincrbyfloat;
// tedis.hkeys;
// tedis.hlen;
// tedis.hmget;
// tedis.hmset;
// tedis.hset;
// tedis.hsetnx;
// tedis.hstrlen;
// tedis.hvals;

// tedis.sadd;
// tedis.scard;
// tedis.sdiff;
// tedis.sdiffstore;
// tedis.sinter;
// tedis.sinterstore;
// tedis.sismember;
// tedis.smembers;
// tedis.smove;
// tedis.spop;
// tedis.srandmember;
// tedis.srem;
// // tedis.sscan
// tedis.sunion;
// tedis.sunionstore;

// console.log(getFiles(BASE_SRC_PATH + '/un-named' + '/zoom-x088727222')); //.map(i => console.log(i));

// docker run --name some-redis -d redis redis-server -v /docker/host/dir:/data --network some-network --save 60 1 --loglevel warning
// docker run -it --network bridge --rm redis redis-cli -h some-redis

// docker run --name some-redis -d redis
// docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning
// docker run -it --network some-network --rm redis redis-cli -h some-redis

// docker run --name some-redis-3 -d redis redis-server --save 60 1 --loglevel warning --network bridge
// docker run -it --network container:Redis_Main_6380 --rm redis redis-cli -h  Redis_Main_6380
// -v ./local/redis/data:/data --save 60 1 --loglevel warning
// --network container:some-redis-7a
/*
Table of contents
Overview
Supported JSON
RedisJSON API

+ Scalar commands
JSON.SET
JSON.GET
JSON.MGET
JSON.DEL
JSON.NUMINCRBY
JSON.NUMMULTBY
JSON.STRAPPEND
JSON.STRLEN

+ Array commands
JSON.ARRAPPEND
JSON.ARRINDEX
JSON.ARRINSERT
JSON.ARRLEN
JSON.ARRPOP
JSON.ARRTRIM

+ Object commands
JSON.OBJKEYS
JSON.OBJLEN

+ Module commands
JSON.TYPE
JSON.DEBUG
JSON.FORGET
JSON.RESP
 tedis.command('SET', 'mykey', 'hello tedis')
JSON.SET <key> <path> <json>
         [NX | XX]
JSON.GET <key>
         [INDENT indentation-string]
         [NEWLINE line-break-string]
         [SPACE space-string]
         [path ...]
JSON.MGET <key> [key ...] <path>
JSON.DEL <key> [path]
JSON.NUMINCRBY <key> <path> <number>
JSON.NUMMULTBY <key> <path> <number>
JSON.STRAPPEND <key> [path] <json-string>
JSON.STRLEN <key> [path]
JSON.ARRAPPEND <key> <path> <json> [json ...]
JSON.ARRINDEX <key> <path> <json-scalar> [start [stop]]
JSON.ARRINSERT <key> <path> <index> <json> [json ...]
JSON.ARRLEN <key> [path]
JSON.ARRPOP <key> [path [index]]
JSON.ARRTRIM <key> <path> <start> <stop>
JSON.OBJKEYS <key> [path]
JSON.OBJLEN <key> [path]
JSON.TYPE <key> [path]
JSON.DEBUG <subcommand & arguments>
JSON.FORGET <key> [path]
JSON.RESP <key> [path]


 */

export function newTedisCommand(command: string) {
  return (tedis: Tedis) => tedis.command(command, 'mykey', 'hello tedis');
}
