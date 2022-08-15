import { QueryResultObject, QueryResultSize } from '$types/';

export function reorder({
  radius,
  id,
  hSize,
  size,
  diff,
  path,
  group,
  dir,
  file,
  ext,
  fullPath,
  ...itm
}: QueryResultObject &
  QueryResultSize & {
    diff?: number;
    fullPath?: string;
    group?: string;
    dir?: string;
    file?: string;
    ext?: string;
  }): QueryResultObject &
  QueryResultSize & {
    diff?: number | undefined;
    fullPath?: string | undefined;
    group?: string | undefined;
    dir?: string | undefined;
    file?: string | undefined;
    ext?: string | undefined;
  } {
  return {
    radius,
    group,
    hSize,
    diff,
    file,
    dir,
    fullPath,
    path,
    id,
    size,
    ext,
    ...itm,
  };
}
