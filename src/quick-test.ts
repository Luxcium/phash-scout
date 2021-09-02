/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';
import { CPU_Mapper, IO_Mapper } from './';

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
async function main() {
  const processMapper = CPU_Mapper(__filename);
  const result = processMapper(values, (x: any) => x * 15, 10);

  result.thread();
  const awaitedResult = await result.mapper();
  const settledResult = awaitedResult.map(o =>
    o.status === 'fulfilled' ? o.value : o.reason
  );
  worker_threads.isMainThread ? console.log(settledResult) : void null;
}
main();
worker_threads.isMainThread ? main2() : void null;
async function main2() {
  // await main();

  const result = IO_Mapper(values, (x: number) => x * 51, 10);
  console.log(
    (await result).map(o => (o.status === 'fulfilled' ? o.value : o.reason))
  );
}
