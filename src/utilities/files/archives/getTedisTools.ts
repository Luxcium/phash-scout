export {};
// import { getNewTedis } from '.';
// import { init, tedis_jsonGet, tedis_jsonSet } from './redisJson';

// export const getTedisTools = (
//   port = 6379,
//   host = '127.0.0.1',
//   options?: {
//     password?: string;
//     timeout?: number;
//     tls?: {
//       key: Buffer;
//       cert: Buffer;
//     };
//   }
// ) => {
//   const tedis = getNewTedis(port, host, options);
//   return {
//     tedis,
//     json: {
//       get: tedis_jsonGet(tedis),
//       set: tedis_jsonSet(tedis),
//       init: init(tedis),
//     },
//   };
// };
