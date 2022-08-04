'use strict';
// #!! Consumed by the RpcWorkerPool class via path to file.

import { parse } from 'node:path';
import { parentPort } from 'worker_threads';

import { redisQuery } from '../../doRedisQuery';
import { rConnect } from '../../rConnect';
import { getBigStrPHashFromFile } from '../../tools';
import { immediateZalgo } from '../../utils';
import { SET } from '../SET';

const Rc = rConnect();

const commands = {
  async redis_phash_query_result(imgFileAbsolutePath) {
    try {
      const previousStepResult = await commands.redis_phash_query(
        imgFileAbsolutePath
      );
      if (Array.isArray(previousStepResult)) {
        if (previousStepResult.length > 0) {
          return previousStepResult;
        } else {
          console.error(
            'at: redis_phash_query_result([])↓\n    error:',
            'TypeError: previousStepResult is an empty array for ' +
            'messageId: '
          );
          return [];
        }
      } else {
      }
      if (!previousStepResult || !previousStepResult.queryResult) {
        console.error(
          'at: redis_phash_query_result([])↓\n    error:',
          `TypeError: previousStepResult${!previousStepResult
            ? ' is ' + undefined
            : !previousStepResult.queryResult
              ? '.queryResult is undefined' + previousStepResult
              : typeof previousStepResult.queryResult !== 'function'
                ? '.queryResult is not a function'
                : ' is' + null + 'will return [](`never`)↓'
          }`
        );
        return [];
      }
      const queryResult = await previousStepResult.queryResult();
      console.log(queryResult);
      return { ...previousStepResult, queryResult };
    } catch (error) {
      console.error('at: redis_phash_query_result([])↓\n    error:', error);
      return [];
    }
  },
  async redis_phash_query(imgFileAbsolutePath) {
    const fnct = redisPhashQuery;

    const errVal = '[]';
    const errMsg = 'redis_phash_query([])↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsolutePath);
  },
  async get_cached_phash(imgFileAbsolutePath) {
    const fnct = getCachedPhash;

    const errVal = '-3';
    const errMsg = 'get_cached_phash(-3)↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsolutePath);
  },

  async bigstr_phash_from_file(imgFileAbsolutePath) {
    const fnct = getBigStrPHashFromFile;

    const errVal = '-2';
    const errMsg = 'bigstr_phash_from_file(-2)↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsolutePath);
  },
};

async function redisPhashQuery(imgFileAbsolutePath) {
  const RC = await Rc;

  const { pathInfos } = pathPaser(imgFileAbsolutePath);
  if (pathInfos.extname !== '.jpg') {
    return ['not .jpg'];
  }

  const cachedPhash = commands.get_cached_phash(imgFileAbsolutePath);
  return getRedisQueryResult(imgFileAbsolutePath, cachedPhash);
}

function pathPaser(imgFileAbsolutePath) {
  const path = parse(imgFileAbsolutePath);
  return {
    pathInfos: {
      ...path,
      fullPath: imgFileAbsolutePath,
      extname: path.ext.toLowerCase(),
      baseName: path.base,
    },
  };
}

async function getRedisQueryResult(imgFileAbsolutePath, cachedPhash) {
  const RC = await Rc;
  const redisQueryResult = redisQuery(
    RC,
    'key',
    imgFileAbsolutePath,
    cachedPhash
  );
  return redisQueryResult;
}
getCachedPhash.count = 0;
async function getCachedPhash(imgFileAbsolutePath) {
  const K = `'cachedPhash:${imgFileAbsolutePath}'`;
  const R = await Rc;

  let value = await R.GET(K);

  if (value !== null && value.toString().length > 10) {
    return immediateZalgo(value);
  }
  value = commands.bigstr_phash_from_file(imgFileAbsolutePath);

  SET(R, K, value);
  return immediateZalgo(value);
}
async function theTryCathBlock({ fnct, errMsg, errVal }, ...args) {
  try {
    return fnct(...args);
  } catch (error) {
    console.error(`at: ${errMsg}\n    error:`, error);
    return errVal;
  }
}

void parentPort.on(
  'message',
  asyncOnMessageWrap(async ({ method, params, id }) => {
    const messageRPC = {
      jsonrpc: '2.0',
      id,
      pid: 'worker:' + process.pid,
    };
    try {
      const resultRPC = await commands[method](...params);
      return { ...messageRPC, result: resultRPC };
    } catch (error) {
      const errorRPC = {
        code: -32_603,
        message:
          'Internal error!!! (Internal JSON-RPC error). ' +
          (error.message || ''),
        data: error,
      };
      return { ...messageRPC, error: errorRPC };
    }
  })
);

function asyncOnMessageWrap(fn) {
  return async function (msg) {
    void parentPort.postMessage(await fn(msg));
  };
}

/* **************************************************************** */
/*                                                                  */
/*  MIT LICENSE                                                     */
/*                                                                  */
/*  Copyright © 2021-2022 Benjamin Vincent Kasapoglu (Luxcium)      */
/*                                                                  */
/*  NOTICE:                                                         */
/*  O’Reilly Online Learning                                        */
/*                                                                  */
/*  Title: “Multithreaded JavaScript”                               */
/*  Author: “by Thomas Hunter II and Bryan English”                 */
/*  Publisher: “O’Reilly”                                           */
/*  Copyright: “© 2022 Thomas Hunter II and Bryan English”          */
/*  ISBN: “978-1-098-10443-6.”                                      */
/*                                                                  */
/*  Using Code Examples                                             */
/*  Supplemental material (code examples, exercises, etc.)          */
/*  is available for download at                                    */
/*  https://github.com/MultithreadedJSBook/code-samples.            */
/*                                                                  */
/*  In general, if example code is offered with this book, you may  */
/*  use it in your programs and documentation. You do not need to   */
/*  contact us for permission unless you’re reproducing a           */
/*  significant portion of the code. For example, writing a         */
/*  program that uses several chunks of code from this book does    */
/*  not require permission. Selling or distributing examples from   */
/*  O’Reilly books does require permission. Answering a question by */
/*  citing this book and quoting example code does not require      */
/*  permission. Incorporating a significant amount of example code  */
/*  from this book into your product’s documentation does require   */
/*  permission.                                                     */
/*                                                                  */
/*  If you feel your use of code examples falls outside fair use or */
/*  the permission given above, feel free to contact us at          */
/*  permissions@oreilly.com.                                        */
/*                                                                  */
/* **************************************************************** */
