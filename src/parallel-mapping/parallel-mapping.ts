/*----------------------------------------------------------------------
 *  Based on work from @userpixel (https://github.com/userpixel)
 *  Copyright (c) 2020 Alex Ewerlöf
 *  Licensed under the MIT License.
 *  See https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *  for original license information.
 *--------------------------------------------------------------------*/
import * as worker_threads from 'worker_threads';
import { Mapper, ThreadMapper, WorkerData } from '../types';
import { workerFactory } from '../worker-factory';
import { mapAllSettled } from './map-allSettled';

//
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export async function parallelMapping<T, U>(
  arr: T[],
  mappingFn: Mapper<T, U>,
  limit: number = arr.length
): Promise<U[]> {
  const threadJob: ThreadMapper<T, U> = (workerdata: WorkerData<T>): U =>
    mappingFn(workerdata.value, workerdata.index, workerdata.array);
  const [mainWorker, threadWorker] =
    workerFactory(__filename)(threadJob)(worker_threads);
  void mainWorker, threadWorker;
  return mapAllSettled(arr, /*  mapFn, */ limit, mainWorker);
}
