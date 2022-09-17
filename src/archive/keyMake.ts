export interface KeyMake {
  (keyName?: string | undefined | null): KeyMake;
  (keyName: string | undefined | null, idValue_0: null): string;
  (keyName: string | undefined | null, idValue_0: string, ...idValue_1: string[]): string;
}

export function keyMake(keyName?: string | undefined | null): KeyMake;
export function keyMake(keyName: string | undefined | null, ...idValue: [string, ...string[]]): string;
export function keyMake(keyName: string | undefined | null, ...idValue: [null]): string;
export function keyMake(keyName?: string | undefined | null, ...idValue: any[]): any {
  const key = keyName ? `${keyName}:` : ''; // .replace('::', ':');
  const jusID = idValue ? idValue.join(':') : null;
  const id = jusID ? `#${jusID}` : '';

  if (!key && !id) {
    return keyMake;
  }
  if (key && !id) {
    if (idValue === null || idValue[0] === null) {
      return `R:@${keyName}`.replace('::', ':') as string;
    }

    return (keyName_ = '', ...idValue_: [string, ...string[]]) => {
      const keyName__ = keyName_ ? `${keyName_}` : '';
      return keyMake(`${key}${keyName__}`, ...idValue_);
    };
  }
  return `R:${key}${id}`.replace(':#', '#').replace('::', ':') as string;
}

const stringKey = keyMake('KEY');
const listKey = keyMake('LIST');
const setKey = keyMake('SET');
const hashesKey = keyMake('HASH');
const pHashKey = keyMake('P_HASH');
const sortedKey = keyMake('SORTED');
const streamKey = keyMake('STREAM');
const geospatialKey = keyMake('GEOSPATIAL');
const hyperloglogKey = keyMake('HYPERLOGLOG');
const bitmapKey = keyMake('BITMAP');
const bitfieldKey = keyMake('BITFIELD');

export const makeRedisKeys = {
  stringKey,
  listKey,
  setKey,
  hashesKey,
  sortedKey,
  streamKey,
  geospatialKey,
  hyperloglogKey,
  bitmapKey,
  bitfieldKey,
  pHashKey,
};
