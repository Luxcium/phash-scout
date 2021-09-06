import * as worker_threads from 'worker_threads';
import { processMapper } from '.';
import type { Mapper, ParallelProcessMapperFactory } from '../types';
export const processMapperFactory: ParallelProcessMapperFactory =
  <T, U>(mapFn: Mapper<T, U>, inDebugMode?: { [K: string]: number }) =>
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
      mapFn,
      limit,
      inDebugMode,
    });

export const processMapping =
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */


    (filename: string) =>
    <T, R>(
      list: T[],
      mapFn: Mapper<T, R>,
      limit?: number,
      inDebugMode?: { [K: string]: number }
    ) =>
      processMapper<T, R>({
        filename,
        workerThreads: worker_threads,
        list,
        mapFn,
        limit,
        inDebugMode,
      });
// IO_Map<T, U>(arr: T[], mapFn:  Mapper<T, U>, limit?: number): Promise<U[]>
export const CPU_Mapper =
  /**
   * The path to the Worker's main script or module.
   * @arg string filename
   * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
   */


    (filename: string) =>
    <T, R>(
      list: T[],
      mapFn: Mapper<T, R>,
      limit?: number,
      inDebugMode?: { [K: string]: number }
    ) => {
      const [mapper, thread] = processMapper<T, R>({
        filename,
        workerThreads: worker_threads,
        list,
        mapFn,
        limit,
        inDebugMode,
      });

      return { mapper, thread };
    };
