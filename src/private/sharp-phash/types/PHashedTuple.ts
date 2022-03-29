import type { CurrentPath } from '../../../packages/file-path/types';

export type PHashedTuple = [
  pHash: string | null,
  currentPath: CurrentPath,
  count: number
];
