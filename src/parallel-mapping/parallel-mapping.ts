/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
// import * as worker_threads from 'worker_threads';
import { Mapper, WT_D } from '../types';
import { wf } from '../worker-thread-mapper-factories/worker-factory';
import { mapAllSettled } from './map-allSettled';

//
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
