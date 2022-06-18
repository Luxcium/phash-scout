import type { CurrentPath } from '../../../private/file-path/types';

export type PHashedTuple = [
  pHash: string | null,
  currentPath: CurrentPath,
  count: number
];
