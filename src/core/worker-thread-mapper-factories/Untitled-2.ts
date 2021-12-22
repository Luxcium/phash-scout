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

const CPU_COUNT = cpuCount();
export function getAsyncWorker<Q, P>(
  script: string,
  initialPayload: P[],
  limit = CPU_COUNT
) {
  const [mainPort, workerPort] = createMessagePorts();
  const willWork = new Promise((resolve, reject) => {
    // &---------------------------------------------------------------+
    // ++--- getAsyncWorker -------------------------------------------+
    //
    const lengthPerThread =
      initialPayload.length / (Math.floor(limit / 2) || 1);
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
  return [willWork, mainPort] as any as Q;
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
    // const { parse } = require('some-js-parsing-library');
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
  /*

reciving diferent items to process in a single function mapping each
items as an argument returning a promise in place of the ongoing
computation to keep the order of teh elements in the list...

sending it to a workerHandler which would be respoinsible to dispatch
the task to each workers


const { MessageChannel } = require('worker_threads');
const { port1, port2 } = new MessageChannel();

 */
  return false;
}
