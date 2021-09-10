/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import type {
  MakeThreadWorkerArgs,
  Mapper,
  WorkerData,
  Worker_Threads,
  WT_D,
} from '../../types';
import { getAsyncWorker } from './the-main-worker';
import { theThreadWorker } from './the-thread-worker';

export function workerFactory<T, R>(
  filename: string,
  threadWorkerFn: Mapper<T, R>,
  worker_threads: WT_D<T>
): [Mapper<T, Promise<R>>, () => () => void] {
  const mainWorker = makeMainWorker<T>(filename, worker_threads);
  const threadWorker = () =>
    makeThreadWorker<T, R>({ threadWorkerFn, worker_threads });

  let intermediateItems: [Mapper<T, Promise<R>>, () => () => void];

  intermediateItems = [mainWorker, threadWorker];
  return intermediateItems;
}

export function makeMainWorker2<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
) {
  return <R>(workerData: WorkerData<T>): Promise<R> =>
    worker_threads.isMainThread
      ? getAsyncWorker<R, unknown>(filename, {
          workerData,
          worker_threads,
        })
      : (void null as never as Promise<R>);
}
function makeMainWorker<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
): <R>(value: T, index?: number, array?: readonly T[]) => Promise<R> {
  return <R>(value: T, index?: number, array?: readonly T[]): Promise<R> =>
    worker_threads.isMainThread
      ? getAsyncWorker<R, unknown>(filename, {
          workerData: { value, index, array },
          worker_threads,
        })
      : (void null as never as Promise<R>);
}

function makeThreadWorker<T, R>({
  threadWorkerFn,
  worker_threads,
}: MakeThreadWorkerArgs<T, R>) {
  const threadWorker_MappingFn = (workerdata: WorkerData<T>): R =>
    threadWorkerFn(workerdata.value, workerdata.index, workerdata.array);
  return () =>
    !worker_threads.isMainThread
      ? theThreadWorker(threadWorker_MappingFn)
      : void null;
}
