import { devPaths } from '../constants/devPaths';
import { filesTypeList } from '../constants/filesTypes';
import { dirListWithFileType } from './dirListWithFileType';
import { getCurrentPaths } from './dirListWithFileType/getCurrentPaths';
import { currentPath } from './getCurrentPaths';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getPathInfos } from './getPathInfos';
import { getRawDirList } from './getRawDirList';
import { getStats } from './getStats';

export { IMGSCOUT } from '../commands';
export { isA_Promise } from './assertion-tools/isA_Promise';
export { isDir, isDirSync } from './assertion-tools/isDir';
export { isQueryResult } from './assertion-tools/isQueryResult';
export { isQueryResultItem } from './assertion-tools/isQueryResultItem';
export { isQueryResultList } from './assertion-tools/isQueryResultList';
export { getBigStrPHashFromFile, getPhash } from './computePHash';
export type { FileType } from './FileTypeEnum';
export { FileType as FileTypes } from './FileTypeEnum';
export { getDirsSync, getFilesAsync, getListing } from './fsTools';
export { getDirListFileTypes } from './getDirListWithFileType';
export { getNewTedis } from './getNewTedis';
export { getPathInfos } from './getPathInfos';
export { getPathStatsInfos } from './getPathStatsInfos';
export { getRawDirList, getRawDirListSync } from './getRawDirList';
export {
  getExt,
  getFile,
  getGroup,
  getHSize,
  getPath,
  getSize,
  getSplit,
} from './getSplit';
export { getStats, getStatsSync } from './getStats';
export { MayBe, Nothing, Right } from './Maybe';
export {
  isExcluded,
  isNull,
  isUndefined,
  notExcluded,
  notNull,
  notNullOrUndef,
  notUndefined,
} from './notExclude';
export { parsePath } from './parsePath';
export { getTransact, readListRx } from './readListR1';
export { redisConnectionString, redisCreateClient } from './redis/redisClient';
export { reorder } from './reorder';
export { toObj } from './toObj';
export { toQueryResultObj } from './toQueryResultObj';
export { toSizedObj } from './toSizedObj';
export { toTup } from './toTup';

export const fsTools = {
  devPaths,
  filesTypeList,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
};


//

import { getSign } from './getSign';
import { zalgo, zalgo1, zalgo2, zalgo3 } from '../utils/restrainingZalgo';
import {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
} from './utils';

export { getPathWithStats } from './getPathWithStats';
export { hasSameTitleInclude } from './hasSameTitleInclude';
export { isArray } from './isArray';
export { titleBuilder } from './titleBuilder';
export {
  filter,
  filterBlockDevices,
  filterCharacterDevices,
  filterDirectories,
  filterFIFOs,
  filterFiles,
  filterSockets,
  filterSymbolicLinks,
} from '../utils/file-filter';

export { replaceStr } from '../tools/replaceStr';
export { shiftTitle } from '../tools/shiftTitle';
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
