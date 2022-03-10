import { Stats } from 'fs-extra';
import { FileType } from '../tools';
import { CurrentPath } from '../types';
import { CurrentPathError } from '../types/file-path-types';
import { CurrentPathAndStats } from './CurrentPathAndStats';
import { CurrentPathWithStats } from './CurrentPathWithStats';

export type GetChild =
  | {
      fileName: string;
      pathToFile: string;
      fullPath: string;
      type: FileType;
      getStats: () => Promise<(Stats & CurrentPath) | CurrentPathError>;
      getChild: () => Promise<
        CurrentPathWithStats | CurrentPathAndStats | CurrentPathError
      >[];
    }
  | CurrentPathError;
