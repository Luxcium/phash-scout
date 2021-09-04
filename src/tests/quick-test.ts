/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { CPU_Mapper, IO_Mapper } from '..';
import { IO_MapperArgs } from '../types';
export const values = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

export async function main() {
  await miniTest_01a();
  // worker_threads.isMainThread ? miniTest_01b() : void null;
  // await miniTest_02a();
  // worker_threads.isMainThread ? miniTest_02b() : void null;
}
main();
export async function miniTest_01a() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, 25);

  result.thread();
  const awaitedResult = await result.mapper();

  worker_threads.isMainThread ? console.log(awaitedResult) : void null;
}
export async function miniTest_01b() {
  const list = values;
  const mapFn = (x: number) => x * 51;
  const limit = 10;

  const IOMapperParams: IO_MapperArgs<number, number> = { list, mapFn, limit };

  const result = IO_Mapper(IOMapperParams);
  const awaitedResult = await result;

  console.log(awaitedResult);
}

export async function miniTest_02a() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15);

  result.thread();
  const awaitedResult = await result.mapper();
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  worker_threads.isMainThread ? console.log(settledResult) : void null;
}

export async function miniTest_02b() {
  const list = values;
  const mapFn = (x: number) => x * 51;
  const limit = 10;

  const IOMapperArgs: IO_MapperArgs<number, number> = { list, mapFn, limit };

  const result = IO_Mapper(IOMapperArgs);
  const awaitedResult = await result;
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  console.log(settledResult);
}
