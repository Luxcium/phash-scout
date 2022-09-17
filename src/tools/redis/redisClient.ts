import { createClient } from 'redis';

import { logDebug, logError, logInfo } from '../../constants';
import { RedisCStrOptions } from '../../types';

/*

  The code below connects to localhost on port 6379. To connect to a
  different host or port, use a connection string in the format
  redis[s]://[[username][:password]@][host][:port][/db-number]

*/

export const redisConnectionString = (options?: RedisCStrOptions) => {
  const o = {
    host: '127.0.0.1',
    port: 6379,
    ssl: false,
    username: '',
    password: '',
    dbNumber: 0,
    ...options,
  };
  return {
    url: `${'redis'}${o.ssl ? 's' : ''}${':'}${'//'}${o.username}${
      !!o.password ? `${':'}` : ''
    }${o.password}${!!o.username || !!o.password ? `${'@'}` : ''}${
      o.host
    }${':'}${o.port}${!!o.dbNumber ? `${'/'}${o.dbNumber}` : ''}`,
  };
};

export function redisCreateClient(options?: RedisCStrOptions) {
  const client = createClient(redisConnectionString(options));

  client
    .on('error', (err: any) => logError(err, 'Redis Client Error'))
    .on('connect', () => {
      logDebug(
        `${`redis:\/\/${options?.host || '127.0.0.1'}`}:${`${
          options?.port || 6379
        }`}/${options?.dbNumber || 0}`,
        'Redis Client Connected'
      );
    })
    .on('ready', () => {
      logDebug(
        `${options?.port || 6379} , ${'db: ' + options?.dbNumber || 0}`,
        'Redis Client ready'
      );
    })
    .on('end', () => {
      logDebug('Redis client Reconnecting(?)...', 'Redis Client end');
    })
    .on('reconnecting', () => {
      logDebug('Redis Client Reconnecting', 'Redis Client Reconnecting');
    });

  return client;
}

export async function redis6382Test() {
  const R = redisCreateClient({ port: 6383 });
  await R.connect();
  const result = String(await R.PING());
  logInfo(result, 'redis6382Test:');
  await R.QUIT();
  return result.toLowerCase() === 'pong';
}
// (async () => logInfo(await redis6382Test()))();
/*
Events
The Node Redis client class is an Nodejs EventEmitter and it emits an event each time the network status changes:

Event name
Scenes
Arguments to be passed to the listener

//+ connect
The client is initiating a connection to the server.
No argument

//+ ready
The client successfully initiated the connection to the server.
No argument

//+ end
The client disconnected the connection to the server via .quit() or .disconnect().
No argument

//+ error
When a network error has occurred, such as unable to connect to the server or the connection closed unexpectedly.
1 argument: The error object, such as SocketClosedUnexpectedlyError: Socket closed unexpectedly or Error: connect ECONNREFUSED [IP]:[PORT]

//+ reconnecting
The client is trying to reconnect to the server.	No argument
*/
// main
// function main(){
//   return (async () => {
//   const client = createClient(
//     redisConnectionString({
//       host: '0.0.0.0',
//       port: 6382,
//     })
//   );

//   client.on('error', err => console.log('Redis Client Error', err));

//   await client.connect();

//   await client.json.set(
//     '005TESTING::JSON:REDIS:::x081054561::x_5ec99a655e0fb',
//     '.isAbsolute:',
//     false
//   );
//   const value = await client.json.get(
//     '005TESTING::JSON:REDIS:::x081054561::x_5ec99a655e0fb'
//   );
//   console.log(value);
//   await client.disconnect();
// })();
// }
