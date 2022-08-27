import { SET } from '../../SET';
import { commands, Rc } from '.';

const PROCESSED = 'processed';
const UNPROCESSED = 'unprocessed';
const PRE_CACHING = false;
export async function getCachedPhash(imgFileAbsPath) {
  try {
    const R = await Rc;

    const result = getBigstr((await getK(R, imgFileAbsPath)) || '');

    if (
      !result ||
      !result.value ||
      typeof result.value === 'undefined' ||
      result.value === 'undefined' ||
      result.value.length < 10 ||
      result.value === ''
    ) {
      const val = await commands.bigstr_phash_from_file(imgFileAbsPath);
      if (PRE_CACHING) {
        return setCachedPhash(R, imgFileAbsPath, val, false);
      }
      return setBigstr(val, false);
    }
    return result;

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
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function getK(R, imgFileAbsPath) {
  const K = cachedPhash_K(imgFileAbsPath);
  return R.GET(K);
}

function cachedPhash_K(imgFileAbsPath) {
  return `'cachedPhash:${imgFileAbsPath}'`;
}

function getBigstr(bigstr) {
  if (bigstr.includes(':')) {
    const [processed, value] = bigstr.split(':');

    return setBigstr(value, processed);
  }
  return setBigstr(bigstr, false);
}
function setBigstr(value, processed) {
  return {
    processed,
    value,
    toString() {
      return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
    },
  };
}

export function setCachedPhash(R, imgFileAbsPath, value, processed) {
  const K = cachedPhash_K(imgFileAbsPath);

  const bigstr = setBigstr(value, processed);
  SET(R, K, bigstr.toString());
  return bigstr;
}
