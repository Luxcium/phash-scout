import type { PQuerryAndAdd, QueryResultItem } from '$types';

import { toQueryResultObj } from '.';
import { uniqueAdd } from '../commands/uniqueAdd';

export async function uniqueAddToObj(querryAndAddParam: PQuerryAndAdd) {
  const addRes: Promise<QueryResultItem[]> = uniqueAdd(querryAndAddParam);
  return toQueryResultObj(addRes);
}
