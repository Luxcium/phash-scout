import * as worker_threads from 'worker_threads';
import { IO_Mapping } from './parallel-mapping-io';
import { processMapping } from './parallel-process-mapping';
import type { Mapper } from './types';

export type ParallelProcessMapperFactory = <T, R>(
  mappingFn: Mapper<T, R>
) => (
  list: T[],
  limit?: number | undefined
) => (filename: string) => [() => Promise<R[]>, () => void];
const processMapperFactory: ParallelProcessMapperFactory =
  <T, R>(mappingFn: Mapper<T, R>) =>
  (list: T[], limit?: number) =>
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */
  filename =>
    processMapping<T, R>({
      filename,
      workerThreads: worker_threads,
      list,
      mappingFn,
      limit,
    });

export { processMapping, IO_Mapping, processMapperFactory };
/*

IO_Mapping<T, U>(arr: T[], mapFn: Mapper, limit?: number): Promise<U[]>

function processMapping<T, U>(options: {
    filename: string;
    workerThreads: WT_D<T>;
    list: T[];
    mappingFn: Mapper<T, U>;
    limit?: number;
}): [() => Promise<U[]>, () => void]

export type ParallelProcessMapperFactory = <T, R>(
  mappingFn: Mapper<T, R>
) => (
  list: T[],
  limit?: number | undefined
) => (filename: string) => [() => Promise<R[]>, () => void];

*/
