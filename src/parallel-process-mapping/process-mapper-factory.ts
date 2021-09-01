import * as worker_threads from 'worker_threads';
import { Mapper, ParallelProcessMapperFactory } from '../types';
import { processMapper } from './';
export const processMapperFactory: ParallelProcessMapperFactory =
  <T, U>(mappingFn: Mapper<T, U>) =>
  (list: T[], limit?: number) =>
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */
  filename =>
    processMapper<T, U>({
      filename,
      workerThreads: worker_threads,
      list,
      mappingFn,
      limit,
    });

// IO_Mapping<T, U>(arr: T[], mapFn:  Mapper<T, U>, limit?: number): Promise<U[]>

export const processMapping =
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */


    (filename: string) =>
    <T, R>(list: T[], mappingFn: Mapper<T, R>, limit?: number) =>
      processMapper<T, R>({
        filename,
        workerThreads: worker_threads,
        list,
        mappingFn,
        limit,
      });

export const processMap =
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */


    (filename: string) =>
    <T, R>(list: T[], mappingFn: Mapper<T, R>, limit?: number) => {
      const [mapper, thread] = processMapper<T, R>({
        filename,
        workerThreads: worker_threads,
        list,
        mappingFn,
        limit,
      });

      return { mapper, thread };
    };
