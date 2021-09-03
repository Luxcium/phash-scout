/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import type { Mapper, WorkerData, Worker_Threads, WT_D } from '../types';
import { theMainWorker } from './the-main-worker';
import { theThreadWorker } from './the-thread-worker';

export function workerFactory<T, R>(
  filename: string,
  mappingFn: Mapper<T, R>,
  worker_threads: WT_D<T>
): [Mapper<T, Promise<R>>, () => () => void] {
  const mainWorker = makeMainWorker<T>(filename, worker_threads);
  const threadWorker = () => makeThreadWorker<T, R>(mappingFn, worker_threads);

  let intermediateItems: [Mapper<T, Promise<R>>, () => () => void];

  intermediateItems = [mainWorker, threadWorker];
  return intermediateItems;
}

function makeMainWorker<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
): <R>(value: T, index?: number, array?: readonly T[]) => Promise<R> {
  return <R>(value: T, index?: number, array?: readonly T[]): Promise<R> =>
    worker_threads.isMainThread
      ? theMainWorker<R>(filename, {
          workerData: { value, index, array },
          worker_threads,
        })
      : (void null as never as Promise<R>);
}

function makeThreadWorker<T, R>(
  mappingFn: Mapper<T, R>,
  worker_threads: Worker_Threads<WorkerData<T>>
) {
  const threadWorker_MappingFn = (workerdata: WorkerData<T>): R =>
    mappingFn(workerdata.value, workerdata.index, workerdata.array);
  return () =>
    !worker_threads.isMainThread
      ? theThreadWorker(threadWorker_MappingFn)
      : void null;
}
