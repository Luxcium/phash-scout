import { getSign } from './getSign';
import { isArray } from './isArray';
import { zalgo, zalgo1, zalgo2, zalgo3 } from './restrainingZalgo';
import {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
} from './utils';

export {
  filter,
  filterBlockDevices,
  filterCharacterDevices,
  filterDirectories,
  filterFIFOs,
  filterFiles,
  filterSockets,
  filterSymbolicLinks,
} from './file-filter';
export { getCurrentPath } from './getCurrentPath';
export { getPathWithStats } from './getPathWithStats';
export {
  getExt,
  getFile,
  getGroup,
  getHSize,
  getPath,
  getSize,
} from './getSplit';
export { hasSameTitleInclude } from './hasSameTitleInclude';
export { isArray } from './isArray';
export { shiftTitle } from './shiftTitle';
export { getSign };
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
  getSign,
  isArray,
};
