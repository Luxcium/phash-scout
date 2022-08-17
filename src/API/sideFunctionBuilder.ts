import axios from 'axios';

import type { SideFunctionParam } from '$types';

import { validExts } from '../constants/validExts';
import { pathParser } from '../tools/paths';
import { averageReducer } from './averageReducer';

// HACK: must be moved outside to CONST or else
export function sideFunctionBuilder(times: number[]) {
  return async ({ fullPath, count, DEBUGS }: SideFunctionParam) => {
    try {
      const { pathInfos } = pathParser(fullPath);
      const ext = pathInfos.ext.toLowerCase();
      const thumb = '_thumb';
      if (validExts.has(ext) && !fullPath.includes(thumb)) {
        DEBUGS &&
          process.stdout.write(
            `\u009B33m[\u009B93m ${(++count.a).toLocaleString()}\u009B33m] \u009B32m${averageReducer(
              times
            ).toFixed(2)} > \u009B37m${fullPath}\u009B0m\n`
          );
        const redisQueryResult = await calculatedFromWorker(fullPath, count.a);
        return [redisQueryResult];
      }
      process.stdout.write(
        `\u009B33m[\u009B93m ${(++count.b).toLocaleString()}\u009B33m] \u009B32m${
          'SKIPED EXT:' + ext
        } > \u009B36m${fullPath}\u009B0m\n`
      );
    } catch (error) {
      console.error('at: sideFunctionBuilder', error);
    }
    return [];
  };
}

async function calculatedFromWorker(fullPath: string, count_a: number) {
  try {
    const phashValue: string[] = (
      await axios.get(
        'http://localhost:8083/redis_phash_query_result/' +
          count_a +
          encodeURI(fullPath)
      )
    ).data.split('\0\n\0');

    return JSON.parse(phashValue.shift() || '{"value" : "-6"}').value;
  } catch {
    return '-5';
  }
}

// const axios = new Axios(); // getCachedPhash(RC, fullPath, getBigStrPHashFromFile);
// JSON.parse(phashValue.shift()).value;

// const multi = true;
// if (multi) {
//   try {
//     const phashValue: string[] = (
//       await axios.get(
//         'http://localhost:8083/bigstr_phash_from_file' + encodeURI(fullPath)
//       )
//     ).data.split('\0\n\0');

//     calculatedValue = JSON.parse(
//       phashValue.shift() || '{"value" : "-1"}'
//     ).value;
//   } catch {
//     calculatedValue = '-2';
//   }
// } else {
//   calculatedValue = await getCachedPhash(
//     RC,
//     fullPath,
//     getBigStrPHashFromFile
//   );
//   calculatedValue = await getBigStrPHashFromFile(fullPath);
// }
// // calculatedValue = '';

// let calculatedValue: string;

// void calculatedFromFile;
// void calculatedFromCache;
// void calculatedFromWorker;
// calculatedValue = '';
// calculatedValue;

// calculatedValue = await calculatedFromFile(fullPath);
// calculatedValue = await calculatedFromCache(fullPath, RC);

// const redisQueryResult = redisQuery(
//   RC,
//   'key',
//   fullPath,
//   immediateZalgo(calculatedValue)
// );
// console.log(
//   'redisQueryResult.queryResult() :>>',
// /* await */ redisQueryResult.queryResult();
// );

// async function calculatedFromCache(fullPath: string, RC: any) {
//   return getCachedPhash(RC, fullPath, getBigStrPHashFromFile);
// }

// async function calculatedFromFile(fullPath: string) {
//   return getBigStrPHashFromFile(fullPath);
// }
