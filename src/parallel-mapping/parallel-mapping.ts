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

export function parallelMapping<T, U>({
  filename,
  workerThreads,
  list,
  mappingFn,
  limit = list.length,
}: {
  filename: string;
  workerThreads: WT_D<T>;
  list: T[];
  mappingFn: Mapper<T, U>;
  limit?: number;
}): [() => Promise<U[]>, () => void] {
  const [mainWorker, threadWorker] = wf.fmw(filename)(mappingFn)(workerThreads);
  return [
    async () => mapAllSettled<T, U>(list, limit, mainWorker()),
    threadWorker(),
  ];
}
