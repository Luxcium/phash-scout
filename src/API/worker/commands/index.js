import { DB_NUMBER } from '../../../constants';
import { getBigStrPHashFromFile } from '../../../tools';
import { rConnect } from '../../../tools/redis';
import { allInOne } from './allInOne';
import { getCachedPhash } from './getCachedPhash';
import { redisPhashQuery } from './redisPhashQuery';
import { redisPhashQueryResult } from './redisPhashQueryResult';
import { theTryCathBlock } from './theTryCathBlock';

const REDIS_DB_NUMBER = DB_NUMBER;
export const Rc = rConnect(null, REDIS_DB_NUMBER, null);

export const commands = {
  async all_in_one(imgFileAbsPath) {
    return allInOne(imgFileAbsPath);
  },
  async redis_phash_query_result(imgFileAbsPath) {
    const fnct = redisPhashQueryResult;

    const errVal = '[]';
    const errMsg = 'redis_phash_query_result([])↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsPath);
  },
  async redis_phash_query(imgFileAbsPath) {
    const fnct = redisPhashQuery;

    const errVal = '[]';
    const errMsg = 'redis_phash_query([])↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsPath);
  },
  async get_cached_phash(imgFileAbsPath) {
    const fnct = getCachedPhash;

    const errVal = '-3';
    const errMsg = 'get_cached_phash(-3)↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsPath, false);
  },

  async bigstr_phash_from_file(imgFileAbsPath) {
    const fnct = getBigStrPHashFromFile;

    const errVal = '-2';
    const errMsg = 'bigstr_phash_from_file(-2)↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsPath);
  },
};
