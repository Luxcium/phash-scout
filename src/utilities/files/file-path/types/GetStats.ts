import type { Stats } from 'fs-extra';
import type { CurrentPath } from '../types';
import type { CurrentPathError } from '../types/file-path-types';

export type GetStats = (Stats & CurrentPath) | CurrentPathError;
