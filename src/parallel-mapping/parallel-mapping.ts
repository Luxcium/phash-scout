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
export function parallelMapping<T, U>(
  filename: string,
  worker_threads: WT_D<T>,
  arr: T[],
  mappingFn: Mapper<T, U>,
  limit: number = arr.length
): [() => Promise<U[]>, () => void] {
  // const threadJob: ThreadMapper<T, U> = (workerdata: WorkerData<T>): U =>
  //   mappingFn(workerdata.value, workerdata.index, workerdata.array);
  const [mainWorker, threadWorker] =
    wf.fmw(filename)(mappingFn)(worker_threads);
  return [
    async () => mapAllSettled<T, U>(arr, limit, mainWorker()),
    threadWorker(),
  ];
}
