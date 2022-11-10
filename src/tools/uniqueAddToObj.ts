import type { PQuerryAndAdd, QueryResultItem } from '@types';

import { uniqueAdd } from '../commands/uniqueAdd';
import { toQueryResultObj } from '.';

export async function uniqueAddToObj(querryAndAddParam: PQuerryAndAdd) {
  const addRes: Promise<QueryResultItem[]> = uniqueAdd(querryAndAddParam);
  return toQueryResultObj(addRes);
}
