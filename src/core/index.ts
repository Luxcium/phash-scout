/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

export {
  Box,
  BoxedAsyncGenerator,
  BoxedGenerator,
  BoxedList,
  boxedListFrom,
  boxedListOf,
  boxFrom,
  boxOf,
  cpuCount,
  immediateZalgo,
  nextTickZalgo,
  nullOrDefined,
  restrainingZalgo,
  timeoutZalgo,
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
} from './classes';
export type {
  IApply,
  IChain,
  IMap,
  IMapItems,
  IUnbox,
  IUnboxList,
} from './classes';
export { CPU_Mapper } from './cpu-mapper';
export { IO_Mapper } from './io-mapper';
export { eitherSettledResult } from './item-mapper';
