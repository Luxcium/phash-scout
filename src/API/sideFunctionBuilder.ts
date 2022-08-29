import axios from 'axios';

import type { Count, SideFunctionParam } from '$types';

import { AVERAGE_EACH, logError, logMedium, PRINT_EACH } from '../constants';
import { validExts } from '../constants/validExts';
import { pathParser } from '../tools/paths';
import { averageReducer } from './averageReducer';
import { commands } from './worker/commands';

export function sideFunctionBuilder(
  times: number[],
  useWorker: boolean = false,
  VERBOSA: boolean = false
) {
  return async ({ fullPath, count }: SideFunctionParam) => {
    try {
      const { pathInfos } = pathParser(fullPath);
      const ext = pathInfos.ext.toLowerCase();
      const thumb = '_thumb';
      let averageReduced = averageReducer(times, AVERAGE_EACH).toFixed(2);
      if (validExts.has(ext) && !fullPath.includes(thumb)) {
        messageFn(count, VERBOSA, averageReduced, fullPath);
        return calculating(fullPath, count, useWorker);
      }

      loggingFn(fullPath, count, averageReduced, ext, VERBOSA);
    } catch (error) {
      logError(String(error), 'at: sideFunctionBuilder');
    }
    return [];
  };
}

async function calculating(
  fullPath: string,
  count: Count,
  useWorker: boolean = false
) {
  try {
    /* eslint no-constant-condition: "off"*/
    const withWorker = useWorker ? calculatedFromWorker : calculatedFromCurrent;
    const redisQueryResult = await withWorker(fullPath, count.a - 1);
    return [redisQueryResult];
  } catch (error: any) {
    logError(error.message, 'at: sideFunctionBuilder when calculating →');
    return [];
  }
}

function messageFn(
  count: Count,
  VERBOSE: boolean,
  averageReduced: string,
  fullPath: string
) {
  count.a++ % PRINT_EACH === 0 &&
    VERBOSE &&
    process.stdout.write(
      `\u009B33m[ \u009B93m${(
        count.a - 1
      ).toLocaleString()}\u009B33m ] \u009B32m${averageReduced} > \u009B37m${fullPath}\u009B0m\n`
    );
}

function loggingFn(
  fullPath: string,
  count: Count,
  averageReduced: string,
  ext: string,
  VERBOSE: boolean
) {
  ++count.b;
  let len1 = (count.a - 1).toLocaleString().length;
  let len2 = count.b.toLocaleString().length;
  let len3 = averageReduced.length;
  let tmpString =
    `[ \u009B93m${count.b.toLocaleString()}\u009B33m ]` +
    ` \u009B32m${ext.padStart(len1 - len2 + len3, ' ')}\u009B37m `;

  VERBOSE &&
    process.stderr.write(
      `\u009B33m${tmpString}\u009B32m${'> '}\u009B35m${fullPath}\u009B0m\n`
    );
}

export async function calculatedFromCurrent(fullPath: string, count_a: number) {
  const id = count_a;
  const messageRPC = {
    jsonrpc: '2.0',
    id,
    pid: 'worker:' + process.pid,
  };
  try {
    const resultRPC = await commands['redis_phash_query_result'](fullPath);
    return { ...messageRPC, result: resultRPC };
  } catch (error) {
    const errorRPC = {
      code: -32_603,
      message: 'Internal error!!! (Internal JSON-RPC error). ' + (error || ''),
      data: error,
    };
    logMedium(
      { ...messageRPC, error: errorRPC },
      'at: sideFunctionBuilder when calculating →'
    );

    return { ...messageRPC, error: errorRPC };
  }
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

    return JSON.parse(phashValue.shift() || '{"value" : "-6"}').value as string;
  } catch {
    return '-5';
  }
}
