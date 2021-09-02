export { IO_Mapper } from './parallel-mapping-io';
export {
  CPU_Mapper,
  processMapperFactory,
  processMapping,
} from './parallel-process-mapping/process-mapper-factory';

/*

IO_Map<T, U>(list: T[], mapFn:  Mapper<T, U>, limit?: number): Promise<U[]>
CPU_Map(filename: string) => <T, R>(list: T[], mapFn:  Mapper<T, R>, limit?: number): {
    mapper: () => Promise<R[]>;
    thread: () => void;
}

function processMapping<T, U>(options: {
    filename: string;
    workerThreads: WT_D<T>;
    list: T[];
    mappingFn: Mapper<T, U>;
    limit?: number;
}): [() => Promise<U[]>, () => void]

export type processMapperFactory = <T, R>(
  mappingFn: Mapper<T, R>
) => (
  list: T[],
  limit?: number | undefined
) => (filename: string) => [() => Promise<R[]>, () => void];

*/
