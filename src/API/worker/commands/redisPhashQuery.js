'use strict';
import { commands } from '.';
import { getRedisQueryResult } from './getRedisQueryResult';
/**
 *
 * @param {string} imgFileAbsPath
 */
export async function redisPhashQuery(imgFileAbsPath) {
  try {
    const cachedPhash = commands.get_cached_phash(imgFileAbsPath);
    return getRedisQueryResult(imgFileAbsPath, cachedPhash);
  } catch (error) {
    throw error;
  }
}
