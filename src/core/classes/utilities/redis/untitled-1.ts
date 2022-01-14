import { Tedis } from 'tedis';
import { tedis_jsonGet, tedis_jsonSet } from './tedis_json';

const PREFIX = 'TESTING:JSON:REDIS';
const JSON_ROOT = '.';
const redisKey = 'test001';

const testJsonRedis = tedis_jsonSet(PREFIX);
const test_rootJsonRedis = testJsonRedis(JSON_ROOT);
const rootJsonRedis = test_rootJsonRedis(new Tedis({ port: 6382 }));
const atTest001 = rootJsonRedis(redisKey);
const setValue = (close: 'close' | boolean = false) =>
  atTest001('{"pommes":[1,2,3,4,5]}', close);
(async () => console.log(await setValue('close')))();

const testJsonRedis_getter = tedis_jsonGet(PREFIX);
const rootTestJsonRedis_getter = testJsonRedis_getter(JSON_ROOT);
const nameit = rootTestJsonRedis_getter(new Tedis({ port: 6382 }));
const getValue = (close: 'close' | boolean = false) => nameit(redisKey, close);

(async () => console.log(await getValue('close')))();
