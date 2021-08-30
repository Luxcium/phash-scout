import { Worker } from 'worker_threads';

export function theMainWorker<Q>(script: any, payload: any): Promise<Q> {
  // isMainThread!!
  return new Promise((resolve, reject) => {
    const worker = new Worker(script, payload);
    // const threadId = worker.threadId;
    // console.log('threadId', threadId);
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
