import * as worker_threads from 'worker_threads';
import parallelMapping from './parallel-mapping';
import { Mapper, WT_D } from './types';

main();
async function main() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [worker, thread] = parallelMapping(
    __filename,
    worker_threads,
    values,
    (x: number) => x + 1,
    1
  );
  thread();
  worker_threads.isMainThread ? console.log(await worker()) : void 0;
}

export const nameMe =
  (filename: string) =>
  <T>(list: T[]) =>
  (limit: number) =>
  (workerThreads: WT_D<T>) =>
  <R>(mappingFn: Mapper<T, R>) =>
    parallelMapping<T, R>(filename, workerThreads, list, mappingFn, limit);
