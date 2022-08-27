import { devPaths } from '../constants/devPaths';
import { filesTypeList } from '../constants/filesTypes';
import { dirListWithFileType } from './dirListWithFileType';
import { getCurrentPaths } from './dirListWithFileType/getCurrentPaths';
import { getSign } from './getSign';
import {
  currentPath,
  getDirListFileTypes,
  getPathInfos,
  getRawDirListAsync,
  getStats,
} from './paths';
import { zalgo, zalgo1, zalgo2, zalgo3 } from './restrainingZalgo';
import {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
} from './utils';

export { IMGSCOUT } from '../commands';
export { isA_Promise } from './assertion-tools/isA_Promise';
export { isDir, isDirSync } from './assertion-tools/isDir';
export { isQueryResult } from './assertion-tools/isQueryResult';
export { isQueryResultItem } from './assertion-tools/isQueryResultItem';
export { isQueryResultList } from './assertion-tools/isQueryResultList';
export { getBigStrPHashFromFile, getPhash } from './computePHash';
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
export type { FileType } from './FileTypeEnum';
export { FileType as FileTypes } from './FileTypeEnum';
export {
  getExt,
  getFile,
  getGroup,
  getHSize,
  getPath,
  getSize,
  getSplit,
} from './getSplit';
export { hasSameTitleInclude } from './hasSameTitleInclude';
export { isArray } from './isArray';
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
// export {
//   getCurrentPath,
//   getDirListFileTypes,
//   getDirsSync,
//   getFilesAsync,
//   getListing,
//   getPathInfos,
//   getPathStatsInfos,
//   getPathWithStats,
//   getRawDirList,
//   getRawDirListSync,
//   getStats,
//   getStatsSync,
//   listFiles,
//   parsePath,
//   pathParser,
// } from './paths';
export { getTransact, readListRx } from './readListR1';
export type { MyReturnType } from './redis';
export {
  doRedisQuery,
  manageRedisQuery,
  rConnect,
  redis6382Test,
  redisConnectionString,
  redisCreateClient,
  redisQuery,
} from './redis';
export { reduceQuerryResults } from './reduceQuerryResults';
export { reorder } from './reorder';
export { replaceStr } from './replaceStr';
export { shiftTitle } from './shiftTitle';
export { titleBuilder } from './titleBuilder';
export { toObj } from './toObj';
export { toQueryResultObj } from './toQueryResultObj';
export { toSizedObj } from './toSizedObj';
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

export const fsTools = {
  devPaths,
  filesTypeList,
  getDirListFileTypes,
  getPathInfos,
  getRawDirListAsync,
  getStats,
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
};
