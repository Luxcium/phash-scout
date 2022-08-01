import { Stats } from 'fs';

import { FileType } from '../tools';
import { CurrentPath } from '.';
import { CurrentPathError } from './complex-types';
import { PathAndStats } from './PathAndStats';
import { PathWithStats } from './PathWithStats';

export type GetChild =
  | {
      fileName: string;
      dir: string;
      fullPath: string;
      type: FileType;
      getStats: () => Promise<(Stats & CurrentPath) | CurrentPathError>;
      getChild: () => Promise<
        PathWithStats | PathAndStats | CurrentPathError
      >[];
    }
  | CurrentPathError;
