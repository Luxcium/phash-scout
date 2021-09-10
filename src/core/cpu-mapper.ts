import { cpus } from 'os';
import * as worker_threads from 'worker_threads';
import type { Mapper } from '../types';
import { processMapper } from './worker-thread-mapper-factories/parallel-mapping';
const cpuCount = () => cpus().length;
// ~&-----------------------------------------------------------------&~
// ~#----- CPU_Mapper Function Declaration ---------------------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function CPU_Mapper(filename: string): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number | undefined
) => {
  mapper: () => Promise<PromiseSettledResult<R>[]>;
  thread: () => void;
} {
  // ~#---------------------------------------------------------------#~
  // ~*----- CPU_Mapper ----------------------------------------------*~
  return <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number) => {
    const [mapper, thread] = processMapper<T, R>({
      filename,
      workerThreads: worker_threads,
      list,
      mapFn,
      limit: limit || cpuCount(),
    });

    return { mapper, thread };
  };
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
// ~#----- processMapping Function Declaration -----------------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function processMapping(
  filename: string
): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number | undefined
) => [() => Promise<PromiseSettledResult<R>[]>, () => void] {
  // ~#---------------------------------------------------------------#~
  // ~*----- processMapping ------------------------------------------*~
  return <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number) =>
    processMapper<T, R>({
      filename,
      workerThreads: worker_threads,
      list,
      mapFn,
      limit,
    });
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
// ~#----- processMapperFactory Function Declaration -----------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function processMapperFactory<T, U>(
  mapFn: Mapper<T, U>
): (
  list: T[],
  limit?: number | undefined
) => (
  filename: string
) => [() => Promise<PromiseSettledResult<U>[]>, () => void] {
  // ~#---------------------------------------------------------------#~
  // ~*----- processMapperFactory ------------------------------------*~
  return (
      list: T[],
      limit?: number
    ): ((
      filename: string
    ) => [() => Promise<PromiseSettledResult<U>[]>, () => void]) =>
    filename =>
      processMapper<T, U>({
        filename,
        workerThreads: worker_threads,
        list,
        mapFn,
        limit,
      });
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
