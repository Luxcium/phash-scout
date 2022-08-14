import { redisCreateClient } from '..';

/**
 * **Invoke and await to get: *REDIS CLIENT***
 *
 * @param {number} port - By default, the Redis server runs on *TCP
 * Port 6379* but **this project use default of 6383**
 *
 * @param {number} dbNumber - Redis databases are numbered from 0
 * to 15. However, you can change the database you're using with this
 * parameter. **this project use default of 0**
 *
 * @param {string} host - By default, no password is used for local
 * Redis. where, REDIS_HOST - IP address of the interface for Redis
 * to bind **this project use default of '0.0.0.0'**
 *
 * @returns *REDIS CLIENT*
 */
export async function rConnect(
  port: number | null = 6383,
  dbNumber: number | null = 0,
  host: string | null = '0.0.0.0'
): Promise<any> {
  /** *REDIS CLIENT* */

  const R = redisCreateClient({
    port: port || 6383,
    dbNumber: dbNumber || 0,
    host: host || '0.0.0.0',
  });
  await R.connect();
  type REDIS_CLIENT = typeof R;
  return R as REDIS_CLIENT;
}

//  = 6383,  -  dbNumber = 0, host = '0. @default [6383] @default 6383 description 0.0.0'
