import { CurrentPathError } from './complex-types';
import { CurrentPath } from './FileCurrentPath';
import { GetStats } from './GetStats';
import { PathAndStats } from './PathAndStats';

export type PathWithStats = CurrentPath & {
  getStats: () => Promise<GetStats>;
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
};
