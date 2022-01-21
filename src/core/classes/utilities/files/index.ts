import { devPaths } from '../../constants/devPaths';
import { filesTypes } from '../../constants/filesTypes';
import {
  asyncDirListWithFileType,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
} from './tools';

export const fsTools = {
  devPaths,
  filesTypes,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
  asyncDirListWithFileType,
};

export {
  devPaths,
  filesTypes,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
  asyncDirListWithFileType,
};
