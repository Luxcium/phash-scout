/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
import * as worker_threads from 'worker_threads';
import type { Mapper, ThreadMapper, WorkerData } from './types';
import { restrainingZalgo } from './utils';
import { workerFactory } from './worker-factory';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
//

const threadWork: ThreadMapper<number, number> = (
  workerdata: WorkerData<number>
): number => workerdata.value + 1;

// WORKERFACTORY -------------------------------------------------------
const [mainWorker, threadWorker] =
  workerFactory(__filename)(threadWork)(worker_threads);

// THREADWORKER ----- ( implied:  NOT isMainThread ) -------------------
threadWorker();

// TEST WORK LOAD ------------------------------------------------------
const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mainWorker<number>()<number>());
(async () =>
  worker_threads.isMainThread
    ? console.log(await Promise.all((values)))
    : void 0)();
//
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

async function parallelMapping<T, U>(
  arr: T[],
  mapFn: Mapper<T,U>,
  limit: number = arr.length
): Promise<U[]> {
  return mapAllSettled(arr, mapFn, limit);
}
async function worker<T>(
  gen: Generator<[T, number, T[]]>,
  mapFn: Mapper<T,unknown>,
  result: any
) {
  for (let [currentValue, index, array] of gen) {
    result[index] = await mapItem(mapFn, currentValue, index, array);
  }
}

async function mapItem<T>(
  mapFn: Mapper<T,unknown>,
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

function* arrayGenerator<T>(array: T[]): Generator<[T, number, T[]]> {
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    yield [currentValue, index, array];
  }
}

async function mapAllSettled<T, U>(
  arr: T[],
  mapFn: Mapper<T,U>,
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


export default parallelMapping;
