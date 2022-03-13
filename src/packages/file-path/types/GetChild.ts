import { Stats } from 'fs';
import { CurrentPath } from '.';
import { FileType } from '../tools';
import { CurrentPathAndStats } from './CurrentPathAndStats';
import { CurrentPathWithStats } from './CurrentPathWithStats';
import { CurrentPathError } from './file-path-types';

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
