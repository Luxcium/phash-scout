'use strict';
import { immediateZalgo } from '../../../tools/restrainingZalgo';
import { SET } from '../../SET';
import { commands, Rc } from '.';

export async function getCachedPhash(imgFileAbsPath) {
  try {
    const K = `'cachedPhash:${imgFileAbsPath}'`;
    const R = await Rc;

    let value = await R.GET(K);

    if (value !== null && value.toString().length > 10) {
      return immediateZalgo(value);
    }
    value = await commands.bigstr_phash_from_file(imgFileAbsPath);

    SET(R, K, immediateZalgo(value));
    return immediateZalgo(value);
  } catch (error) {
    throw error;
  }
}
