/*------------------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *----------------------------------------------------------------------------*/
import { promisify } from 'util';
import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
//
if (isMainThread) {
  const mapper = (num: number) =>
    theMainWorker(__filename, { workerData: { num: num } });
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => mapper(num));
  (async () => console.log(await Promise.all(values)))();
} else {
  theThreadWorker((_workerData: any) => _workerData.num * _workerData.num);
  // parentPort?.postMessage(workerData.num * workerData.num);
}

export function theMainWorker(script: any, payload: any) {
  // isMainThread!!
  return new Promise((resolve, reject) => {
    const worker = new Worker(script, payload);
    const threadId = worker.threadId;
    console.log('threadId', threadId);
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
export function theThreadWorker(func: any) {
  // !!notIsMainThread
  parentPort?.postMessage(func(workerData));
}

type Mapper = <T, U>(value: T, index: number, array: readonly T[]) => U;

/**
 * @see https://blog.izs.me/2013/08/designing-apis-for-asynchrony
 */
const restrainingZalgo = () => promisify(setImmediate)();

//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

/*
if (isMainThread) {
  const mapper = (num: number) =>
    theMainWorker(__filename, { workerData: { num: num } });
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => mapper(num));
  (async () => console.log(await Promise.all(values)))();
} else {
  theThreadWorker((_workerData: any) => _workerData.num * _workerData.num);
  // parentPort?.postMessage(workerData.num * workerData.num);
}
type Mapper = <T, U>(value: T, index: number, array: readonly T[]) => U;

 */
async function mapItem<T>(
  mapFn: Mapper,
  currentValue: T,
  index: number,
  array: T[]
) {
  await restrainingZalgo();
  try {
    return {
      status: 'fulfilled',
      value: await mapFn(currentValue, index, array),
    };
  } catch (reason) {
    return {
      status: 'rejected',
      reason,
    };
  }
}

async function worker<T>(
  gen: Generator<[T, number, T[]]>,
  mapFn: Mapper,
  result: any
) {
  for (let [currentValue, index, array] of gen) {
    result[index] = await mapItem(mapFn, currentValue, index, array);
  }
}

function* arrayGenerator<T>(array: T[]): Generator<[T, number, T[]]> {
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    yield [currentValue, index, array];
  }
}

async function mapAllSettled<T, U>(
  arr: T[],
  mapFn: Mapper,
  limit: number = arr.length
): Promise<U[]> {
  const result: U[] = [];

  if (arr.length === 0) {
    return result;
  }

  const gen /* :[T,number,T[]] */ = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);

  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(gen, mapFn, result));
  }

  await Promise.all(workers);

  return result;
}

async function parallelMapping<T, U>(
  arr: T[],
  mapFn: Mapper,
  limit: number = arr.length
): Promise<U[]> {
  return mapAllSettled(arr, mapFn, limit);
}
export default parallelMapping;
