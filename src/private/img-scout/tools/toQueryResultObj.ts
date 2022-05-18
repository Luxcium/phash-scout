import { isA_Promise } from '../../../packages/file-path/tools';
import { toSizedObj } from '../toSizedObj';
import { QueryResultItem, QueryResultObject, QueryResultSize } from '../types';

export function toQueryResultObj(
  queryItem: QueryResultItem
): QueryResultObject & QueryResultSize;
export function toQueryResultObj(
  queryItem: Promise<QueryResultItem[]>
): Promise<QueryResultObject[]>;
export function toQueryResultObj(
  queryItem: QueryResultItem | Promise<QueryResultItem[]>
): (QueryResultObject & QueryResultSize) | Promise<QueryResultObject[]> {
  if (isA_Promise(queryItem)) {
    return (async () => {
      const result = (await queryItem).map(
        (
          x: QueryResultItem
        ): QueryResultObject & QueryResultSize & { diff?: number } =>
          toSizedObj(x)
      );
      return (await Promise.all(result))
        .sort((a, b) => b.size - a.size || a.path.length - b.path.length)
        .map((item, _i, array) => {
          item.diff = item.size - array[0].size;
          return reorder(item); //{ ...itm };
        });
    })();
  }
  return toSizedObj(queryItem); //as QueryResultObject;
}

const reorder = ({
  // absPath,
  // group,
  hSize,
  size,
  path,
  id,
  radius,
  diff,
  ...itm
}: QueryResultObject & QueryResultSize & { diff?: number }): QueryResultObject &
  QueryResultSize & { diff?: number } => ({
  // absPath,
  // group,
  hSize,
  size,
  diff,
  path,
  id,
  radius,
  ...itm,
});
reorder;
/*
      absPath,
      group,
      hSize,
      size,
      path,
      id,
      radius,
      diff,
 */
