import { devPaths } from '../constants/devPaths';
import { filesTypes } from '../constants/filesTypes';
import { asyncDirListWithFileType } from './asyncDirListWithFileType';
import { getDirListFileTypes } from './getDirListWithFileType';
import { getPathInfos } from './getPathInfos';
import { getRawDirList } from './getRawDirList';
import { getStats } from './getStats';

export {
  asyncDirListWithFileType,
  dirListWithFileTypeSync,
} from './asyncDirListWithFileType';
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
  asyncDirListWithFileType,
};
