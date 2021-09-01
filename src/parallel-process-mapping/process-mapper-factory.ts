import * as worker_threads from 'worker_threads';
import { Mapper, ParallelProcessMapperFactory } from '../types';
import { processMapping } from './';
export const processMapperFactory: ParallelProcessMapperFactory =
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
