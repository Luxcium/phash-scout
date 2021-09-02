/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { CPU_Mapper, IO_Mapper } from '.';

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
async function main() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, 10);

  result.thread();
  const awaitedResult = await result.mapper();

  worker_threads.isMainThread ? console.log(awaitedResult) : void null;
}
main();
worker_threads.isMainThread ? main2() : void null;
async function main2() {
  // await main();

  const result = IO_Mapper(values, (x: number) => x * 51, 10);
  const awaitedResult = await result;

  console.log(awaitedResult);
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
