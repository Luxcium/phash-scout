// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
//

// const threadWork: ThreadMapper<number, number> = (
//   workerdata: WorkerData<number>
// ): number => workerdata.value + 1;

// WORKERFACTORY -------------------------------------------------------
// export const workerThreadFactory =
//   (filename: string) =>
//   <T, R>(threadWork: ThreadMapper<T, R>) =>
//     workerFactory(filename)(threadWork)(worker_threads);

// export const wThreadFactory =
//   <T, R>(threadWork: ThreadMapper<T, R>) =>
//   (filename: string) =>
//     workerFactory(filename)(threadWork)(worker_threads);

// const [mainWorker_workPayload, threadWorker_startUnit] =
//   workerFactory(__filename)(threadWork)(worker_threads);

// THREADWORKER ----- ( implied:  NOT isMainThread ) -------------------
// threadWorker_startUnit();

// TEST WORK LOAD ------------------------------------------------------
// const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
//   mainWorker_workPayload<number>()<number>()
// );
// (async () =>
//   worker_threads.isMainThread
//     ? console.log(await Promise.all(values))
//     : void 0)();
//
// Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
