/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
import * as worker_threads from 'worker_threads';
import type { Mapper, ThreadMapper, WM, WorkerData, WT } from './types';
import { restrainingZalgo } from './utils';
import { workerFactory } from './worker-factory';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
//

const threadWork: ThreadMapper<number, number> = (
  workerdata: WorkerData<number>
): number => workerdata.value + 1;

// WORKERFACTORY -------------------------------------------------------
export const workerThreadFactory =
  (filename: string) =>
  <T, R>(threadWork: ThreadMapper<T, R>) =>
    workerFactory(filename)(threadWork)(worker_threads);

export const wThreadFactory =
  <T, R>(threadWork: ThreadMapper<T, R>) =>
  (filename: string) =>
    workerFactory(filename)(threadWork)(worker_threads);

const [mainWorker_workPayload, threadWorker_startUnit] =
  workerFactory(__filename)(threadWork)(worker_threads);

// THREADWORKER ----- ( implied:  NOT isMainThread ) -------------------
threadWorker_startUnit();

// TEST WORK LOAD ------------------------------------------------------
const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  mainWorker_workPayload<number>()<number>()
);
(async () =>
  worker_threads.isMainThread
    ? console.log(await Promise.all(values))
    : void 0)();
//
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

async function parallelMapping<T, U>(
  arr: T[],
  mapFn: Mapper<T, U>,
  limit: number = arr.length
): Promise<U[]> {
  const threadJob: ThreadMapper<T, U> = (workerdata: WorkerData<T>): U =>
    mapFn(workerdata.value, workerdata.index, workerdata.array);
  const [mainWorker, threadWorker] =
    workerFactory(__filename)(threadJob)(worker_threads);
  void mainWorker, threadWorker;
  return mapAllSettled(arr, /*  mapFn, */ limit, mainWorker);
}
async function worker<T>(
  gen: Generator<[T, number, T[]]>,
  // mapFn: Mapper<T,unknown>,
  result: any,
  mainWorker: WM<T, unknown>
) {
  for (let [currentValue, index, array] of gen) {
    result[index] = await mapItem(currentValue, index, array, mainWorker);
  }
}

async function mapItem<T>(
  currentValue: T,
  index: number,
  array: T[],
  mainWorker: WM<T, unknown>
) {
  await restrainingZalgo();

  try {
    return {
      status: 'fulfilled',
      mainWorker,
      value: await mainWorker(currentValue, index, array),
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
  // mapFn: Mapper<T,U>,
  limit: number = arr.length,
  mainWorker: WT
): Promise<U[]> {
  const result: U[] = [];

  if (arr.length === 0) {
    return result;
  }
  const gen /* :[T,number,T[]] */ = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);
  const mainWorker_: WM<T, U> = mainWorker<T>()<U>();
  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(gen, /* mapFn, */ result, mainWorker_));
  }

  await Promise.all(workers);

  return result;
}

export default parallelMapping;
