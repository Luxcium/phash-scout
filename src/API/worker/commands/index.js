import { rConnect } from '../../../rConnect';
import { getBigStrPHashFromFile } from '../../../tools';
import { getCachedPhash } from './getCachedPhash';
import { redisPhashQuery } from './redisPhashQuery';
import { redisPhashQueryResult } from './redisPhashQueryResult';
import { theTryCathBlock } from './theTryCathBlock';

export const Rc = rConnect();

export const commands = {
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

    return theTryCathBlock(p, imgFileAbsPath);
  },

  async bigstr_phash_from_file(imgFileAbsPath) {
    const fnct = getBigStrPHashFromFile;

    const errVal = '-2';
    const errMsg = 'bigstr_phash_from_file(-2)↓';

    const p = { fnct, errMsg, errVal };

    return theTryCathBlock(p, imgFileAbsPath);
  },
};
