import type { PhashNow } from '../../../core/types';
import type { CurrentPath } from '../../../private/file-path/types';

export type PHashedPath = { path: CurrentPath; phash: PhashNow };
