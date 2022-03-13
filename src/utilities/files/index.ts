import { devPaths } from '../../constants/devPaths';
import { filesTypes } from './file-path/constants/filesTypes';
import {
  asyncDirListWithFileType,
  getDirListFileTypes,
  getPathInfos,
  getRawDirList,
  getStats,
} from './file-path/tools';

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
