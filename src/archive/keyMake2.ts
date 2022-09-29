type KeyMake = (keyName?: string, ...idValue: string[]) => string | KeyMake;

function keyMake(keyName?: string | undefined): KeyMake;
function keyMake(
  keyName?: string | undefined,
  ...idValues: [string, ...string[]]
): string;
function keyMake(
  keyName?: string | undefined,
  ...idValues: string[]
): string | KeyMake {
  const key = keyName ? `${keyName}:` : '';
  const id = idValues.length > 0 ? `#${idValues.join(':')}` : '';
  if (!key && !id) {
    return (keyName_ = '', idValues_ = '') => keyMake(keyName_, idValues_);
  }
  if (key && !id) {
    return (keyName_ = '', idValue_ = '') =>
      keyMake(`${key}${keyName_}`, idValue_);
  }

  return `${key}${id}→` as string;
}

const a2 = keyMake();
console.log('a:', a2);
//    ^? - const a: KeyMake
const b2 = keyMake('key')();
console.log('b:', b2);
//    ^? - const b: KeyMake
const c2 = keyMake(undefined, 'something');
console.log('c:', c2);
//    ^? - const c: string
const d2 = keyMake('blah', 'multiple', 'things');
console.log('d:', d2);
//    ^? - const d: string
console.log();

const stringKey2 = keyMake('STRING');
const stringKeyID2 = stringKey2('id');
console.log('stringKey(ID)', stringKeyID2);
const listKey2 = keyMake('LIST');
console.log('listKey(ID)', listKey2('undefined', 'id'));

// const setKey = keyMake('SET');
// console.log('setKey(ID)', setKey('undefined', 'id'));

// const hashesKey = keyMake('HASHES');
// console.log('hashesKey(ID)', hashesKey('undefined', 'id'));

// const sortedKey = keyMake('SORTED');
// console.log('sortedKey(ID)', sortedKey('undefined', 'id'));

// const streamKey = keyMake('STREAM');
// console.log('streamKey(ID)', streamKey('undefined', 'id'));

// const geospatialKey = keyMake('GEOSPATIAL');
// console.log('geospatialKey(ID)', geospatialKey('undefined', 'id'));

// const hyperloglogKey = keyMake('HYPERLOGLOG');
// console.log('hyperloglogKey(ID)', hyperloglogKey('undefined', 'id'));

// const bitmapKey = keyMake('BITMAP');
// console.log('bitmapKey(ID)', bitmapKey('undefined', 'id'));

// const bitfieldKey = keyMake('BITFIELD');
// console.log('bitfieldKey(ID)', bitfieldKey('undefined', 'id'));

// type KeyMake = (keyName?: string, ...idValue: string[]) => string |KeyMake;
export function keyMakeX2(
  keyName: string | undefined,
  idVal: string = ''
): any {
  const key = keyName ? `${keyName}:` : ``;
  const id = idVal ? `#${idVal}` : ``;
  idVal;
  if (!key && !id) {
    return (keyName_ = '', idValues_ = '') => keyMakeX2(keyName_, idValues_);
  }
  if (key && !id) {
    return (keyName_ = '', idValue_ = '') =>
      keyMakeX2(`${key}${keyName_}`, idValue_);
  }

  return `${key}${id}→` as string;
}
// ꭆꬴꝱꞽꞩ
// const stringKey = keyMake('KEY'); // ('𝕜𝕖𝕪'); // 𝕜𝕖𝕪 𝕂𝔼𝕐
// const listKey = keyMake('LIST'); // ('𝓛𝓲𝓼𝓽'); // 𝓵𝓲𝓼𝓽 𝓛𝓲𝓼𝓽
// const setKey = keyMake('SET'); // ('𝚂𝙴𝚃');
// const hashesKey = keyMake('HASH'); // ('𝐇𝐚𝐬𝐡'); // 𝐇𝐀 𝐡𝐚𝐬𝐡 𝐇𝐚𝐬𝐡
// const pHashKey = keyMake('P_HASH'); // ('𝚙𝙷𝚊𝚜𝚑'); // 𝗽𝐇𝐚𝐬𝐡 · mathematical sans-serif bold small 𝚙𝚑𝚊𝚜𝚑 𝙷 𝚙𝙷𝚊𝚜𝚑
// const sortedKey = keyMake('SORTED'); // ('𝚜𝚘𝚛𝚝𝚎𝚍'); // 𝒔𝒐𝒓𝒕𝒆𝒅𝑆𝐸𝑇 // 𝔖𝔬𝔯𝔱𝔢𝔡𝕾𝖊𝖙 // 𝑠𝑜𝑟𝑡𝑒𝑑
// const streamKey = keyMake('STREAM'); // ('𝓢𝓽𝓻𝓮𝓪𝓶');
// const geospatialKey = keyMake('GEOSPATIAL'); // ('GEOSPATIAL');
// const hyperloglogKey = keyMake('HYPERLOGLOG'); // ('HYPERLOGLOG');
// const bitmapKey = keyMake('BITMAP'); // ('BITMAP');
// const bitfieldKey = keyMake('BITFIELD'); // ('BITFIELD');

// console.log('stringKey(ID)', stringKey);
// export const makeRedisKeys = {
//   stringKey,
//   listKey,
//   setKey,
//   hashesKey,
//   sortedKey,
//   streamKey,
//   geospatialKey,
//   hyperloglogKey,
//   bitmapKey,
//   bitfieldKey,
// };

//  */

const a = keyMake();
console.log('a:', a);
//    ^? - const a: KeyMake
const b = keyMake('key')();
console.log('b:', b);
//    ^? - const b: KeyMake
const c = keyMake('key')(undefined, 'something');
console.log('c:', c);
//    ^? - const c: string
const d = keyMake('key')(undefined, 'something');
console.log('d:', d);
//    ^? - const d: string
console.log();

const stringKey = keyMake('STRING');
const stringKeyID = stringKey(undefined, 'id');
console.log('stringKey(ID)', stringKeyID);
const listKey = keyMake('LIST');
console.log('listKey(ID)', listKey(undefined, 'id'));

const setKey = keyMake('SET');
console.log('setKey(ID)', setKey(undefined, 'id'));

const hashesKey = keyMake('HASHES');
console.log('hashesKey(ID)', hashesKey(undefined, 'id'));

const sortedKey = keyMake('SORTED');
console.log('sortedKey(ID)', sortedKey(undefined, 'id'));

const streamKey = keyMake('STREAM');
console.log('streamKey(ID)', streamKey(undefined, 'id'));

const geospatialKey = keyMake('GEOSPATIAL');
console.log('geospatialKey(ID)', geospatialKey(undefined, 'id'));

const hyperloglogKey = keyMake('HYPERLOGLOG');
console.log('hyperloglogKey(ID)', hyperloglogKey(undefined, 'id'));

const bitmapKey = keyMake('BITMAP');
console.log('bitmapKey(ID)', bitmapKey(undefined, 'id'));

const bitfieldKey = keyMake('BITFIELD');
console.log('bitfieldKey(ID)', bitfieldKey(undefined, 'id'));

// type KeyMake = (keyName?: string, ...idValue: string[]) => string |KeyMake;
export function keyMakeX(keyName: string | undefined, idVal: string = ''): any {
  const key = keyName ? `${keyName}:` : ``;
  const id = idVal ? `#${idVal}` : ``;
  idVal;
  if (!key && !id) {
    return (keyName_ = '', idValues_ = '') => keyMakeX(keyName_, idValues_);
  }
  if (key && !id) {
    return (keyName_ = '', idValue_ = '') =>
      keyMakeX(`${key}${keyName_}`, idValue_);
  }

  return `${key}${id}→` as string;
}

// const stringKey = keyMake('STRING');
// const listKey = keyMake('LIST');
// const setKey = keyMake('SET');
// const hashesKey = keyMake('HASHES');
// const sortedKey = keyMake('SORTED');
// const streamKey = keyMake('STREAM');
// const geospatialKey = keyMake('GEOSPATIAL');
// const hyperloglogKey = keyMake('HYPERLOGLOG');
// const bitmapKey = keyMake('BITMAP');
// const bitfieldKey = keyMake('BITFIELD');

// console.log('stringKey(ID)', stringKey);
// export const makeRedisKeys = {
//   stringKey,
//   listKey,
//   setKey,
//   hashesKey,
//   sortedKey,
//   streamKey,
//   geospatialKey,
//   hyperloglogKey,
//   bitmapKey,
//   bitfieldKey,
// };
// /*

//  */

/*
𝓈 S string 𝓼𝓽𝓻𝓲𝓷𝓰 𝕂𝔼𝕐
ℓ L list
S set 𝔰𝔢𝔱
ℎ H hash
𝓼 S sorted 𝖘𝖔𝖗𝖙𝖊𝖉𝔰𝔢𝔱 𝔰𝔬𝔯𝔱𝔢𝔡𝖘𝖊𝖙
S stream 𝓼𝓽𝓻𝓮𝓪𝓶 𝓢𝓽𝓻𝓮𝓪𝓶
ꞡ G geospatial
ℏ H hyperloglog
B bitmap
B bitfield


const ǃv_‿⁀⁔︳︴﹍﹎﹏＿ = '';
void ǃv_‿⁀⁔︳︴﹍﹎﹏＿;
𐅁
greek acrophonic attic one half

U+10141

𐅂
greek acrophonic attic one drachma

U+10142

𐅃
greek acrophonic attic five

U+10143

𐅄
greek acrophonic attic fifty

U+10144

𐅅
greek acrophonic attic five hundred

U+10145

𐅆
greek acrophonic attic five thousand

U+10146

𐅇
greek acrophonic attic fifty thousand

U+10147

𐅈
greek acrophonic attic five talents

U+10148

𐅉
greek acrophonic attic ten talents

U+10149

𐅊
greek acrophonic attic fifty talents

U+1014A

𐅋
greek acrophonic attic one hundred talents

U+1014B

𐅌
greek acrophonic attic five hundred talents

U+1014C


 */
