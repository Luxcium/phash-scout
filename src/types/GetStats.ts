import type { Stats } from 'fs';

import type { CurrentPathError } from './complex-types';
import { CurrentPath } from './FileCurrentPath';

export type GetStats = (Stats & CurrentPath) | CurrentPathError;
