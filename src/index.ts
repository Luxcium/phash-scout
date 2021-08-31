import * as worker_threads from 'worker_threads';
import parallelMapping from './parallel-mapping';
import type { Mapper } from './types';

export const parallelMapperFactory =
  <T, R>(mappingFn: Mapper<T, R>) =>
  (list: T[], limit?: number) =>
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */
  (filename: string) =>
    parallelMapping<T, R>({
      filename,
      workerThreads: worker_threads,
      list,
      mappingFn,
      limit,
    });

export default parallelMapping;
