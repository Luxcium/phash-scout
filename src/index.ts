export { IO_Mapping } from './parallel-mapping-io';
export { processMapping } from './parallel-process-mapping';
export { processMapperFactory } from './parallel-process-mapping/process-mapper-factory';

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
