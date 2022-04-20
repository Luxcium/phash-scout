export { CPU_Mapper, IO_Mapper } from './core';
// export type {
//   IApply,
//   IChain,
//   IMap,
//   IMapItems,
//   IUnbox,
//   IUnboxList,
// } from './core';
export type {
  CPU_MapperRetunType,
  Mapper,
  MapperArgs,
  ThenMapper,
} from './core/types';
export {
  cpuCount,
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
} from './core/utils';

/*
(alias) function CPU_Mapper(filename: string): <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number | undefined) => {
    mapper: () => Promise<PromiseSettledResult<R>[]>;
    thread: () => void;
}
export CPU_Mapper
The path to the Worker's main script or module.

(alias) function IO_Mapper<T, U>({ list, mapFn, limit, }: IO_MapperArgs<T, U>): Promise<PromiseSettledResult<U>[]>
export IO_Mapper
*/
