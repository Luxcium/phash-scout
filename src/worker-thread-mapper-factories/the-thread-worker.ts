/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { parentPort, workerData } from 'worker_threads';

/** isMainThread! === false  */
export function theThreadWorker(func: any) {
  // !!notIsMainThread
  parentPort?.postMessage(func(workerData));
}
