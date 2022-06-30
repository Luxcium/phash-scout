import type { Stats } from 'fs';
import type { CurrentPath } from '.';
import type { CurrentPathError } from './complex-types';

export type GetStats = (Stats & CurrentPath) | CurrentPathError;
