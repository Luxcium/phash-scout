/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { CPU_Mapper, IO_Mapper } from '..';
export const values = [0, 1, 10];

export async function main() {
  await miniTest_01a();
  worker_threads.isMainThread ? miniTest_01b() : void null;
  await miniTest_02a();
  worker_threads.isMainThread ? miniTest_02b() : void null;
}
main();
export async function miniTest_01a() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, 10);

  result.thread();
  const awaitedResult = await result.mapper();

  worker_threads.isMainThread ? console.log(awaitedResult) : void null;
}
export async function miniTest_01b() {
  const result = IO_Mapper(values, (x: number) => x * 51, 10);
  const awaitedResult = await result;

  console.log(awaitedResult);
}

async function miniTest_02a() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, 10);

  result.thread();
  const awaitedResult = await result.mapper();
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  worker_threads.isMainThread ? console.log(settledResult) : void null;
}

async function miniTest_02b() {
  const result = IO_Mapper(values, (x: number) => x * 51, 10);
  const awaitedResult = await result;
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  console.log(settledResult);
}

/*

❯ tsc; node "/home/luxcium/src/parallel-mapping/out/src/quick-test-1.js"
[
  { status: 'fulfilled', value: 0 },
  { status: 'fulfilled', value: 51 },
  { status: 'fulfilled', value: 102 },
  { status: 'fulfilled', value: 153 },
  { status: 'fulfilled', value: 204 },
  { status: 'fulfilled', value: 255 },
  { status: 'fulfilled', value: 306 },
  { status: 'fulfilled', value: 357 },
  { status: 'fulfilled', value: 408 },
  { status: 'fulfilled', value: 459 },
  { status: 'fulfilled', value: 510 }
]
[
  { status: 'fulfilled', value: 0 },
  { status: 'fulfilled', value: 15 },
  { status: 'fulfilled', value: 30 },
  { status: 'fulfilled', value: 45 },
  { status: 'fulfilled', value: 60 },
  { status: 'fulfilled', value: 75 },
  { status: 'fulfilled', value: 90 },
  { status: 'fulfilled', value: 105 },
  { status: 'fulfilled', value: 120 },
  { status: 'fulfilled', value: 135 },
  { status: 'fulfilled', value: 150 }
]

 */
