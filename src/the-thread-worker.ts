import { parentPort, workerData } from 'worker_threads';

export function theThreadWorker(func: any) {
  // !!notIsMainThread
  parentPort?.postMessage(func(workerData));
}
