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

import { Mapper, WT_D } from '../types';
import { wf } from '../worker-thread-mapper-factories/worker-factory';
import { mapAllSettled } from './map-allSettled';

export function processMapper<T, U>({
  filename,
  workerThreads,
  list,
  mapFn,
  limit = list.length,
}: {
  filename: string;
  workerThreads: WT_D<T>;
  list: T[];
  mapFn: Mapper<T, U>;
  limit?: number;
}): [() => Promise<PromiseSettledResult<U>[]>, () => void] {
  const [mainWorker, threadWorker] = wf.fmw(filename)(mapFn)(workerThreads);
  return [
    async () => mapAllSettled<T, U>(list, limit, mainWorker()),
    threadWorker(),
  ];
}
