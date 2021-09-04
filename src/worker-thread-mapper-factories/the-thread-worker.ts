/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';

/** isMainThread! === false  */
export function theThreadWorker<F extends Function>(func: F) {
  // !!notIsMainThread
  const { workerData } = worker_threads;
  worker_threads.parentPort?.postMessage(func(workerData));
}
