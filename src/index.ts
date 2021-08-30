/*------------------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *----------------------------------------------------------------------------*/
import { promisify } from 'util';
import type { MessagePort } from 'worker_threads';
import * as worker_threads from 'worker_threads';
const { isMainThread, parentPort, Worker, workerData } = worker_threads;
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
//

/** Partial interface for `worker_threads` module */
export interface Worker_Threads<W> {
  isMainThread: boolean;
  parentPort: MessagePort | null;
  Worker: typeof worker_threads.Worker;
  workerData: W;
}
export type WorkerData<V> = { value: V; index: number; array: readonly V[] };
export type WorkerMapper_<U, R> = (workerData: WorkerData<U>) => R;
export type threadMapper<U, R> = (workerData: WorkerData<U>) => R;

export function NEED_TO_NAME_THIS_FUNCTION_USED_TO_MAP_IN_A_WORKER(
  filename: string
) {
  return <A, B>(threadWork: threadMapper<A, B>) =>
    <T>(worker_threads: Worker_Threads<WorkerData<T>>) => {
      const { isMainThread, parentPort, Worker, workerData } = worker_threads;
      void isMainThread, parentPort, Worker, workerData;
      const w_theMainWorkerMapperFunction =
        <R>() =>
        (value: T, index?: number, array?: readonly T[]): Promise<R> =>
          isMainThread
            ? theMainWorker<R>(filename, {
                workerData: { value, index, array },
              })
            : (void null as never as Promise<R>); // theMainWorker<R>(script: any, payload: any): Promise<R>
      const t_theThreadWorkerFunction = () =>
        !isMainThread ? theThreadWorker(threadWork) : void null;
      const returnValues: [<R>(values: T[]) => Promise<R>[], () => void] = [
        <R>(values: T[]) =>
          values.map<Promise<R>>(w_theMainWorkerMapperFunction<R>()),
        t_theThreadWorkerFunction,
      ];
      return returnValues; //  [w_theMainWorkerMapperFunction, t_theThreadWorkerFunction];
    };
}

// const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const results = values.map(w);
// w: <X>(value: number, index: number, array: number[]) => Promise<X>
//  <R>(val: T, index?: number, array?: readonly T[])
//const mainWorkerMapper = <T>(value: T, index?: number, array?: readonly T[]) =>
// theMainWorker(__filename, { workerData: { value, index, array } });

type Mapper = <T, U>(value: T, index?: number, array?: readonly T[]) => U;

const threadWork_: threadMapper<number, number> = (
  workerdata: WorkerData<number>
): number => workerdata.value + 1;
export const a = NEED_TO_NAME_THIS_FUNCTION_USED_TO_MAP_IN_A_WORKER(__filename);
const b = a(threadWork_);
const [w, t] = b(worker_threads);

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const results = w<number>(values);
(async () =>
  isMainThread ? console.log(await Promise.all(results)) : void 0)();
t();

export function theMainWorker<Q>(script: any, payload: any): Promise<Q> {
  // isMainThread!!
  return new Promise((resolve, reject) => {
    const worker = new Worker(script, payload);
    // const threadId = worker.threadId;
    // console.log('threadId', threadId);
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

void async function mapItem_temp<T>(
  mapFn: Mapper,
  currentValue: T,
  index: number,
  array: T[]
) {
  if (isMainThread) {
    // #region isMain · isMain · isMain · isMain · isMain · isMain · isMain     !
    const mapper = <T>(value: T, index: number, array: readonly T[]): any =>
      theMainWorker(__filename, { workerData: { value, index, array } });
    void mapper, currentValue, index, array;
    // #endregion MAIN · MAIN · MAIN · MAIN · MAIN · MAIN · MAIN · MAIN · MAIN  !
  } else {
    // #region NOT isMain NOT · NOT isMain NOT · NOT isMain NOT                 !
    theThreadWorker(
      (_workerData: { value: T; index: number; array: readonly T[] }) =>
        mapFn(_workerData.value, _workerData.index, _workerData.array)
    );
    // #endregion THREAD · THREAD · THREAD · THREAD · THREAD · THREAD · THREAD  !
  }
};

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
