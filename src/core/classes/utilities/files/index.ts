import { devPaths } from './constants/devPaths';
import { filesTypes } from './constants/filesTypes';
import {
  asyncDirListWithFileType,
  getDirListWithFileType,
  getPathInfos,
  getRawDirList,
  getStats,
} from './tools';

export const fsTools = {
  devPaths,
  filesTypes,
  getDirListWithFileType,
  getPathInfos,
  getRawDirList,
  getStats,
  asyncDirListWithFileType,
};

export {
  devPaths,
  filesTypes,
  getDirListWithFileType,
  getPathInfos,
  getRawDirList,
  getStats,
  asyncDirListWithFileType,
};
