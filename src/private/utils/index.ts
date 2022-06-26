import { getDevFilename } from '../../core/tools/getDevFileName';
import {
  immediateZalgo,
  isAllArrays,
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

import { getSign } from './getSign';
import { isArray } from './isArray';

export { isArray } from './isArray';
export { getDevFilename, getSign, isDevEnv, NODE_ENV };
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
};
