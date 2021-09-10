import { cpus } from 'os';
import * as worker_threads from 'worker_threads';
import type { Mapper } from '../types';
import { processMapper } from './worker-thread-mapper-factories/parallel-mapping';
const cpuCount = () => cpus().length;
type CPU_MapperArgs<T, U> = {
  list: T[];
  mapFn: Mapper<T, U>;
  limit?: number | undefined;
};

export interface Icpu_mapper {
  cpu_mapper<T, R>(
    mapperListOrObj: CPU_MapperArgs<T, R>
  ): {
    mapper: () => Promise<PromiseSettledResult<R>[]>;
    thread: () => void;
  };
}

// ~&-----------------------------------------------------------------&~
type CPU_MapperRetunType<R> = {
  mapper: () => Promise<PromiseSettledResult<R>[]>;
  thread: () => void;
};
// ~#----- CPU_Mapper Function Declaration ---------------------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function CPU_Mapper(filename: string): {
  <T, R>(mapperListOrObj: CPU_MapperArgs<T, R>): CPU_MapperRetunType<R>;
  <T, R>(
    list: T[],
    mapFn: Mapper<T, R>,
    limit?: number
  ): CPU_MapperRetunType<R>;
} {
  // ~#---------------------------------------------------------------#~
  // ~*----- CPU_Mapper ----------------------------------------------*~
  function cpu_mapper<T, R>(
    mapperListOrObj: CPU_MapperArgs<T, R>
  ): CPU_MapperRetunType<R>;
  function cpu_mapper<T, R>(
    mapperListOrObj: T[],
    mapFn: Mapper<T, R>,
    limit?: number
  ): CPU_MapperRetunType<R>;
  function cpu_mapper<T, R>(
    mapperListOrObj: T[] | CPU_MapperArgs<T, R>,
    mapFn?: Mapper<T, R> | null,
    limit?: number | null
  ): CPU_MapperRetunType<R> {
    const args = mapperArgs(mapperListOrObj, mapFn, limit);
    const [mapper, thread] = processMapper<T, R>({
      filename,
      workerThreads: worker_threads,
      list: args.list,
      mapFn: args.mapFn,
      limit: args.limit || cpuCount(),
    });

    return { mapper, thread };
  }
  return cpu_mapper;
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
// ~#----- mapperArgs Function Declaration ---------------------------#~
function mapperArgs<T, R>(
  listOrObj: T[] | CPU_MapperArgs<T, R>,
  mapFn?: Mapper<T, R> | null,
  limit?: number | null
): CPU_MapperArgs<T, R> {
  // ~#---------------------------------------------------------------#~
  // ~*----- mapperArgs ----------------------------------------------*~
  let list: T[] = [];
  let mapFn_: Mapper<T, R>;
  let limit_: number | undefined = 0;
  if (!Array.isArray(listOrObj) && typeof listOrObj === 'object') {
    list = listOrObj.list;
    mapFn_ = listOrObj.mapFn;
    limit_ = listOrObj.limit;
    return { list, mapFn: mapFn_, limit: limit_ };
  }
  list = listOrObj;
  if (mapFn != null) {
    return { list, mapFn, limit: limit ? limit : undefined };
  }
  // When mapFn is null or undefined throw TypeError.
  const errMsg = 'Error: mapFn must be a function of type Mapper<A, B>';
  throw new TypeError(errMsg);
}
// ~*-----------------------------------------------------------------*~
