import { FileType } from '../tools';
import { CurrentPathAndStats } from './CurrentPathAndStats';
import { CurrentPathError } from './file-path-types';
import { GetStats } from './GetStats';

export type CurrentPathWithStats = {
  fileName: string;
  pathToFile: string;
  fullPath: string;
  type: FileType;
  getStats: () => Promise<GetStats>;
  getChild: () => Promise<
    CurrentPathWithStats | CurrentPathAndStats | CurrentPathError
  >[];
};
