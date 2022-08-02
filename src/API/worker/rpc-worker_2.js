'use strict';
import { cpus } from 'os';
import { Worker } from 'worker_threads';

const VERBOSE = true;

function setSize(self, size = 0) {
  const CORES = cpus().length;
  if (size === 0) self.size = CORES; // <1>
  else if (size < 0) self.size = Math.max(CORES + size, 1);
  else self.size = size;
  return self;
}
export class RpcWorkerPool {
  static STRATEGIES = new Set(['roundrobin', 'random', 'leastbusy']);
  /** @member {number} */
  size;
  /** @member {number} */
  worker_uid;
  /** @member {number} */
  next_command_id;

  /** @member {number} */
  rr_index;
  constructor(path, size = 0, strategy = 'roundrobin') {
    this.size = setSize(this, size).size;

    if (!RpcWorkerPool.STRATEGIES.has(strategy)) {
      throw new TypeError('invalid strategy');
    }
    this.strategy = strategy;
    this.rr_index = -1;
    this.worker_uid = 0;
    this.next_command_id = 0;
    this._workers = new Map();

    for (let i = 0; i < this.size; i++) {
      const worker = new Worker(path);
      this._workers.set(++this.worker_uid, {
        worker_uid: this.worker_uid,
        worker,
        in_flight_commands: new Map(),
      });

      worker.on('message', msg => {
        console.log("worker.on('message'", msg);
        this._onMessageHandler(msg, this.worker_uid);
      });
    }
  }
  // ++ ----------------------------------------------------------------
  _onMessageHandler(msg, worker_uid) {
    const worker = this._workers.get(worker_uid);
    const { result, error, id } = msg;
    const { resolve, reject } = worker.in_flight_commands.get(id);
    worker.in_flight_commands.delete(id);
    if (error) reject(error);
    else resolve(result);
  }

  // ++ ----------------------------------------------------------------
  _getWorker(data_id) {
    let worker_id;
    if (this.strategy === 'random') {
      worker_id = Math.floor(Math.random() * this._workers.size) + 1;
    } else if (this.strategy === 'roundrobin') {
      if (++this.rr_index >= this._workers.size) this.rr_index = 1;
      worker_id = this.rr_index;
    } else if (this.strategy === 'leastbusy') {
      let min = Infinity;
      this._workers.forEach(worker => {
        if (worker.in_flight_commands.size < min) {
          min = worker.in_flight_commands.size;
          worker_id = worker.worker_uid;
        }
      });
    }
    VERBOSE && console.log('Selected Worker:', worker_id, 'data_id:', data_id);
    return this._workers.get(worker_id);
  }
  // ++ ----------------------------------------------------------------
  /**
   * @param {string} method - The first input number
   */
  exec(method, message_id, ...args) {
    const id = ++this.next_command_id;
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const worker = this._getWorker(message_id); // <1>
    worker.in_flight_commands.set(id, { resolve, reject });
    worker.worker.postMessage({ method, params: args, id });

    return promise;
  }
}

/* **************************************************************** */
/*                                                                  */
/*  MIT LICENSE                                                     */
/*                                                                  */
/*  Copyright © 2021-2022 Benjamin Vincent Kasapoglu (Luxcium)      */
/*                                                                  */
/*  NOTICE:                                                         */
/*  O’Reilly Online Learning                                        */
/*                                                                  */
/*  Title: “Multithreaded JavaScript”                               */
/*  Author: “by Thomas Hunter II and Bryan English”                 */
/*  Publisher: “O’Reilly”                                           */
/*  Copyright: “© 2022 Thomas Hunter II and Bryan English”          */
/*  ISBN: “978-1-098-10443-6.”                                      */
/*                                                                  */
/*  Using Code Examples                                             */
/*  Supplemental material (code examples, exercises, etc.)          */
/*  is available for download at                                    */
/*  https://github.com/MultithreadedJSBook/code-samples.            */
/*                                                                  */
/*  In general, if example code is offered with this book, you may  */
/*  use it in your programs and documentation. You do not need to   */
/*  contact us for permission unless you’re reproducing a           */
/*  significant portion of the code. For example, writing a         */
/*  program that uses several chunks of code from this book does    */
/*  not require permission. Selling or distributing examples from   */
/*  O’Reilly books does require permission. Answering a question by */
/*  citing this book and quoting example code does not require      */
/*  permission. Incorporating a significant amount of example code  */
/*  from this book into your product’s documentation does require   */
/*  permission.                                                     */
/*                                                                  */
/*  If you feel your use of code examples falls outside fair use or */
/*  the permission given above, feel free to contact us at          */
/*  permissions@oreilly.com.                                        */
/*                                                                  */
/* **************************************************************** */
