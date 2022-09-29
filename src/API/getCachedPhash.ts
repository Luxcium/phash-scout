import axios from 'axios';

import { immediateZalgo } from '../tools';
import { SET } from './SET';

export async function getCachedPHash(
  RC: any,
  k_FullPath: string,
  getValueFnct: (fullPath: string) => Promise<string>
) {
  const K = `'cachedPhash:${k_FullPath}'`;
  const R = await RC;

  let value: Promise<string> | string = (await R.GET(K)) as string;
  if (value !== null && value.toString().length < 10) {
    return immediateZalgo(value);
  }

  // calling getBigStrPHashFromFile here:

  // HACK:------------------------------------------------------------
  value = calculatedFromWorker(k_FullPath);
  getValueFnct;
  // getValueFnct(k_FullPath);
  // :----------------------------------------------------------------
  SET(R, K, value);
  return immediateZalgo(value);
}

async function calculatedFromWorker(fullPath: string) {
  try {
    const phashValue: string[] = (
      await axios.get(
        'http://localhost:8083/bigstr_phash_from_file' + encodeURI(fullPath)
      )
    ).data.split('\0\n\0');

    return JSON.parse(phashValue.shift() || '{"value" : "-1"}').value;
  } catch {
    return '-2';
  }
}
