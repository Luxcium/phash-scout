import {
  DB_NUMBER as REDIS_DB_NUMBER,
  logFatal,
  PRE_CACHING,
  PROCESSED,
  UNPROCESSED,
} from '../../../constants';
import { rConnect } from '../../../tools';
import { SET } from '../../SET';
import { getBigStrPHashFromFile } from './getBigStrPHash';

export const Rc = rConnect(null, REDIS_DB_NUMBER, null);

export async function getCachedPhash(imgFileAbsPath: string) {
  const R = await Rc;
  try {
    const redisGetK_ = await redisGetK(R, imgFileAbsPath);
    const bigStrObj_ = bigStrObj(redisGetK_ || '');
    if (!isValid(bigStrObj_)) {
      const val = await getBigStrPHashFromFile(imgFileAbsPath);
      // getBigStrPHashFromFile
      if (PRE_CACHING) {
        return redisSetK(R, imgFileAbsPath, val, false);
      }

      return bigStrObjFactory(val, false);
    }
    return bigStrObj_;
  } catch (error) {
    logFatal(error);
    return {
      processed: null,
      value: '-2',
      toString() {
        return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
      },
    };
  }
}
type BigStrObj = {
  processed: any;
  value: any;
  toString(): string;
};
function isValid(bigStrObj: BigStrObj) {
  return (
    bigStrObj &&
    bigStrObj.value &&
    bigStrObj.value !== 'undefined' &&
    bigStrObj.value !== 'null' &&
    bigStrObj.value.length > 10
  );
}

function redisGetK(R: any, imgFileAbsPath: string) {
  const K = cachedPhash_K(imgFileAbsPath);
  return R.GET(K);
}

function cachedPhash_K(imgFileAbsPath: string) {
  return `'cachedPhash:${imgFileAbsPath}'`;
}

function bigStrObj(bigstr: string) {
  if (bigstr.includes(':')) {
    const [processed, value] = bigstr.split(':');
    return bigStrObjFactory(value, processed);
  }
  return bigStrObjFactory(bigstr, UNPROCESSED);
}

export function redisSetK(
  R: any,
  imgFileAbsPath: string,
  value: string,
  processed: any
) {
  const K = cachedPhash_K(imgFileAbsPath);

  const bigstr = bigStrObjFactory(value, processed);
  SET(R, K, bigstr.toString());
  return bigstr;
}

export function bigStrObjFactory(value: string, processed: any) {
  return {
    processed,
    value,
    toString() {
      return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
    },
  };
}

// const { value, processed } = {
//   value: '',
//   processed: false,
//   ...optionalValue,
// };
// const K = cachedPhash_K(imgFilecAbsPath);
// const R = await Rc;

// const calculatedValue =
//   value ||
//   getBigstr(
//     (await R.GET(K)) ||
//     (await commands.bigstr_phash_from_file(imgFileAbsPath))
//   ).value;

// return setCachedPhash(R, imgFileAbsPath, calculatedValue, processed);
