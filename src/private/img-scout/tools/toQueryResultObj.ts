import { isA_Promise } from '../../../packages/file-path/tools';
import { toSizedObj } from '../querryAndAdd';
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
        (x: QueryResultItem): QueryResultObject & QueryResultSize =>
          toSizedObj(x)
      );
      return (await Promise.all(result)).sort(
        (a, b) => b.size - a.size || a.path.length - b.path.length
      );
    })();
  }
  return toSizedObj(queryItem); //as QueryResultObject;
}
