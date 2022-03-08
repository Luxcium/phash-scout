/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
import * as worker_threads from 'worker_threads';
import { CPU_Mapper, IO_Mapper } from '..';
import type { MapperArgs } from '../core/types/types';

const items = 100;
const steps = Math.floor(items / 1);
export const values = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
  40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22,
  21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
].slice(0, items);

// https://git.io/JuC6r
export async function main() {
  await CPU_MAP_miniTest_01a();
  if (worker_threads.isMainThread) {
    await IO_MAP_miniTest_01b();
  }
  // worker_threads.isMainThread ? miniTest_01b() : void null;
  // await miniTest_02a();
  // worker_threads.isMainThread ? miniTest_02b() : void null;
}
main();
export async function CPU_MAP_miniTest_01a() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, steps);

  result.thread();
  if (worker_threads.isMainThread) {
    const awaitedResult = async () => await result.mapper();
    console.log(await awaitedResult());
  }
}
export async function IO_MAP_miniTest_01b() {
  const list = values;
  const mapFn = (x: number) => 2 ** x;
  const limit = 10;

  const IOMapperParams: MapperArgs<number, number> = { list, mapFn, limit };

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
  const limit = steps;

  const IOMapperArgs: MapperArgs<number, number> = { list, mapFn, limit };

  const result = IO_Mapper(IOMapperArgs);
  const awaitedResult = await result;
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  console.log(settledResult);
}
