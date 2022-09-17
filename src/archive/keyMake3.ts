export type KeyMake = (keyName?: string | undefined | null, jusID?: string | undefined) => KeyMake;

export interface IKeyMake {
  (keyName?: string | undefined | null, jusID?: undefined): IKeyMake;
  (keyName: string | undefined | null, jusID: string): string;
  (keyName?: string | undefined | null, jusID?: string | undefined): any;
}

export interface IKeyMake2 {
  (keyName?: string | undefined | null): IKeyMake2;
  (keyName: string | undefined | null, ...idValue: [string, ...string[]]): string;
  (keyName?: string | undefined | null, ...idValue: string[]): any;
}

export function keyMake2(keyName?: string | undefined | null): IKeyMake2;
export function keyMake2(keyName: string | undefined | null, ...idValue: [string, ...string[]]): string;
export function keyMake2(keyName?: string | undefined | null, ...idValue: string[]): any {
  const jusID = idValue.join(':');
  const key = (keyName ? `${keyName}:` : '').replace('::', ':');
  const id = jusID ? `#${jusID}` : '';
  if (!key && !id) {
    return (keyName_ = '', ...idValue_: [string, ...string[]]) => {
      return keyMake2(keyName_, ...idValue_);
    };
  }
  if (key && !id) {
    return (keyName_ = '', ...idValue_: [string, ...string[]]) => {
      const keyName__ = keyName_ ? `${keyName_}:` : '';
      return keyMake2(`${key}${keyName__}`, ...idValue_);
    };
  }

  return `${key}${id}→` as string;
}

export function keyMake(keyName?: string | undefined | null, jusID?: undefined): IKeyMake;
export function keyMake(keyName: string | undefined | null, jusID: string): string;
export function keyMake(keyName?: string | undefined | null, jusID?: string | undefined): any {
  const key = (keyName ? `${keyName}:` : '').replace('::', ':');
  const id = jusID ? `#${jusID}` : '';
  if (!key && !id) {
    return (keyName_ = '', idValues_ = '') => {
      return keyMake(keyName_, idValues_);
    };
  }
  if (key && !id) {
    return (keyName_ = '', idValue_ = '') => {
      const keyName__ = keyName_ ? `${keyName_}:` : '';
      return keyMake(`${key}${keyName__}`, idValue_);
    };
  }

  return `${key}${id}→` as string;
}

const stringKey = keyMake('STRING')(null, 'IO');
const listKey = keyMake('LIST');
const setKey = keyMake('SET');
const hashesKey = keyMake('HASHES');
const sortedKey = keyMake('SORTED');
const streamKey = keyMake('STREAM');
const geospatialKey = keyMake('GEOSPATIAL');
const hyperloglogKey = keyMake('HYPERLOGLOG');
const bitmapKey = keyMake('BITMAP');
const bitfieldKey = keyMake('BITFIELD');

// console.log('stringKey(ID)', stringKey);
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
};

const a = keyMake2();
console.log('a:', a);
//    ^? - const a: KeyMake
const b = keyMake2('key')();
console.log('b:', b);
//    ^? - const b: KeyMake
const c = keyMake2('key')(undefined, 'something');
console.log('c:', c);
//    ^? - const c: string
const d = keyMake('key')(undefined, 'something');
console.log('d:', d);
//    ^? - const d: string
console.log();
