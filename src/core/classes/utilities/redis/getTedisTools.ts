import { getNewTedis } from '.';
import { get, init, set } from './redisJson';

export const getTedisTools = (
  port = 6379,
  host = '127.0.0.1',
  options?: {
    password?: string;
    timeout?: number;
    tls?: {
      key: Buffer;
      cert: Buffer;
    };
  }
) => {
  const tedis = getNewTedis(port, host, options);
  return {
    tedis,
    json: {
      get: get(tedis),
      set: set(tedis),
      init: init(tedis),
    },
    close: tedis.close,
  };
};
