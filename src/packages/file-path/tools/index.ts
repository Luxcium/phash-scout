import { devPaths } from '../constants/devPaths';
import { filesTypes } from '../constants/filesTypes';
import {
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
} from './dirListWithFileType';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getPathInfos } from './getPathInfos';
import { getRawDirList } from './getRawDirList';
import { getStats } from './getStats';

export { FileType as FileTypes } from './FileTypeEnum';
export type { FileType } from './FileTypeEnum';
export {
  getDirs,
  getDirsSync,
  getFiles,
  getFilesSync,
  getListings,
  getListingsSync,
} from './fsTools';
export { getDirListFileTypes } from './getDirListWithFileType';
export { getPathInfos } from './getPathInfos';
export { getRawDirList, getRawDirListSync } from './getRawDirList';
export { getStats, getStatsSync } from './getStats';

export const fsTools = {
  devPaths,
  filesTypes,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
  currentPath,
  dirListWithFileType,
  getCurrentPaths,
};
