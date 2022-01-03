import * as vm from 'vm';
import type { MessagePort } from 'worker_threads';
import * as worker_threads from 'worker_threads';
import {
  isMainThread,
  MessageChannel,
  parentPort,
  Worker,
  workerData,
} from 'worker_threads';
import { cpuCount } from '..';
import { getDevFilename } from '../classes/utilities';

export function getAsyncWorker<P>(
  script: string,
  initialPayload: P[],
  limit = 0
) {
  const initialLimit = limit || cpuCount();
  const [mainPort, workerPort] = createMessagePorts();
  const willWork = new Promise((resolve, reject) => {
    // &---------------------------------------------------------------+
    // ++--- getAsyncWorker -------------------------------------------+
    //
    const lengthPerThread =
      initialPayload.length / (Math.floor(initialLimit / 2) || 1);

    lengthPerThread;
    const worker = new Worker(script, {
      workerData: {
        initialPayload,
        port: workerPort,
      },
      transferList: [workerPort],
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
    //
    // ++--------------------------------------------------------------+
    // &---------------------------------------------------------------+
  });
  // HACK: (temporary)
  return [willWork, mainPort];
}

export function theThreadWorker<F extends Function, Z = any>(func: F): boolean {
  // &-----------------------------------------------------------------+
  // ++--- theThreadWorker --------------------------------------------+
  if (isMainThread! === false) {
    const { workerData }: { workerData: Z } = worker_threads;

    parentPort!.postMessage(func(workerData));
    return true;
  }
  return false;
  //
  // ++----------------------------------------------------------------+
  // &-----------------------------------------------------------------+
}
export function createMessagePorts(): [MessagePort, MessagePort] {
  // MessagePort, MessagePort : [] {
  const { port1, port2 } = new MessageChannel();
  return [port1, port2];
}

export function fnMain() {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  getAsyncWorker(getDevFilename()(), list, 3);

  const mapFn = (x: number) => x * x;
  void list, mapFn;

  return 0;
}
if (isMainThread! === true) {
  fnMain();
}
export function mainAssingmentVOID() {
  if (isMainThread === false) {
    // const { workerData }: { workerData: Z } = worker_threads;
    // parentPort!.postMessage(func(workerData));
    // return true;
    console.log('not is main thread');
  }

  //   const {
  //   Worker, isMainThread, parentPort, workerData
  // } = require('worker_threads');

  function parseJSAsync<T>(script: T) {
    // if (isMainThread) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

  if (!isMainThread) {
    const script = workerData;
    parentPort!.postMessage(vm.runInNewContext(script));
  }
  if (isMainThread) {
    parseJSAsync(`console.log({
  animal: 'cat',
  count: 2
})`);
  }

  const [port1, port2] = createMessagePorts();
  port1.postMessage('');
  void port1, port2;

  // ---------------------------------------------------------------------
  // const vm = require('vm');
  const ContextObject = vm.runInNewContext('Object'); // 1;

  console.log(Object === ContextObject); // 2;
  console.log(new Object() instanceof ContextObject); // 3;
  console.log(ContextObject.name); // 4;

  return false;

  //  const someconst: PromiseConstructor = Promise;
  //  type Resolve<T> = (value: T | PromiseLike<T>) => void;
  //  type PromiseRejector = (reason?: any) => void;
  //  type PromiseExecutor<T> = (
  //   resolve: Resolve<T>,
  //   reject: PromiseRejector
  // ) => void;

  //  type Resolever<T> = (resolve: Resolve<T>) => Resolve<T>;

  //  function resolever<T>(resolve: Resolve<T>) {
  //   return resolve;
  // }
  //  type MyPromiseConstructor<T> = (
  //   executor: PromiseExecutor<T>
  // ) => Promise<T>;
  // let boo: boolean = true;
  //  function makePromiseOf<T>(resolever: Resolever<T>) {
  //   return new Promise((resolve, reject) => {
  //     if (boo) {
  //       const rslv = resolever(resolve);
  //       return rslv(0 as any as T);
  //     }
  //     return void reject(1);
  //   });
  // }

  /*

reciving diferent items to process in a single function mapping each
items as an argument returning a promise in place of the ongoing
computation to keep the order of teh elements in the list...

sending it to a workerHandler which would be respoinsible to dispatch
the task to each workers


const { MessageChannel } = require('worker_threads');
const { port1, port2 } = new MessageChannel();

 */
  // console.log(
  //   `${splitedHead(
  //     __filename,
  //     'parallel-mapping/'
  //   )}parallel-mapping/out/${splitedHead(
  //     splitedTail(__filename, 'parallel-mapping/'),
  //     '.ts'
  //   )}.js`
  // );
  // /home/luxcium/.local/src/parallel-mapping
  // /src/core/worker-thread-mapper-factories/Untitled-2.ts
  // /home/luxcium/.local/src/parallel-mapping/out/src/core/worker-thread-mapper-factories/Untitled-2.js
  // NODE_ENV=development
}
