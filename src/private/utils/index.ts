import { getDevFilename } from '../../core/tools/getDevFileName';
import {
  immediateZalgo,
  isAllArrays,
  isArray,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
} from '../../core/utils';
import { isDevEnv } from '../../core/utils/isDevEnv';
import { NODE_ENV } from '../../core/utils/NODE_ENV';
import {
  splitedHead,
  splitedTail,
  splitHead,
  splitTail,
} from '../../core/utils/split';
import { getSign } from './getSign';

export {
  getDevFilename,
  getSign,
  isDevEnv,
  NODE_ENV,
  splitedHead,
  splitedTail,
  splitHead,
  splitTail,
};
export {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
};

export const utils = {
  getDevFilename,
  getSign,
  isAllArrays,
  isArray,
  isDevEnv,
  NODE_ENV,
  splitedHead,
  splitedTail,
  splitHead,
  splitTail,
};
