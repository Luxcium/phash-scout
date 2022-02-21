import { CurrentPath } from '../../types';

const S = 'string';

export function isA_CurrentPath(item: any): item is CurrentPath {
  return (
    typeof item.type === S &&
    typeof item.fileName === S &&
    typeof item.absolutePathTo === S &&
    typeof item.fullPathTo !== 'undefined'
  );
}
