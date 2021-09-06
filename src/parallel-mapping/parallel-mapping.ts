/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
/*  Based on work from @userpixel (https://github.com/userpixel)      */
/*  Copyright (c) 2020-2021 Alex Ewerlöf                              */
/*--------------------------------------------------------------------*/

import type { MapAllSettledArgs, Mapper, ProcessMapperArgs } from '../types';
import { workerFactory } from '../worker-thread-mapper-factories';
import { mapAllSettled } from './map-allSettled';

export function processMapper<T, U>({
  filename,
  workerThreads,
  list,
  mapFn,
  limit = list.length,
  inDebugMode,
}: ProcessMapperArgs<T, U> & {
  inDebugMode?: { [K: string]: number };
}): [() => Promise<PromiseSettledResult<U>[]>, () => void] {
  const [mainWorker, threadWorker] = workerFactory(
    filename,
    mapFn,
    workerThreads
  );
  const workerMapFn: Mapper<T, Promise<U>> = mainWorker;
  const mapAllSettledArgs: MapAllSettledArgs<T, U> & {
    inDebugMode?: { [K: string]: number };
  } = {
    list,
    mapFn: workerMapFn,
    limit,
    inDebugMode,
  };
  return [async () => mapAllSettled<T, U>(mapAllSettledArgs), threadWorker()];
}
