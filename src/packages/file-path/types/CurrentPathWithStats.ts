import { CurrentPathAndStats } from './CurrentPathAndStats';
import { CurrentPath, CurrentPathError } from './file-path-types';
import { GetStats } from './GetStats';

export type CurrentPathWithStats = CurrentPath & {
  getStats: () => Promise<GetStats>;
  getChild: () => Promise<
    CurrentPathWithStats | CurrentPathAndStats | CurrentPathError
  >[];
};
