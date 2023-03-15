import { CurrentPath } from './FileCurrentPath';

export type PHashedTuple = [
  pHash: string | null,
  currentPath: CurrentPath,
  count: number
];
