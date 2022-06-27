// export type { FileType } from '../tools';
export type { Bg } from './Bg';
export type { DirentWithFileType } from './DirentWithFileType';
export type { FileType, FileType as FileTypes } from './Enums/FileTypeEnum';
export type { FALSY } from './Falsy';
export type {
  BlockDevicePath,
  CharacterDevicePath,
  CurrentPathError,
  DirectoryPath,
  ErrorTypePath,
  FIFOPath,
  FilePath,
  SocketPath,
  SymbolicLinkPath,
  UnknownTypePath,
} from './file-path-types';
export type {
  BaseBase,
  BasedDir,
  BasedExt,
  BaseName,
  BaseRoot,
  CurrentPath,
  // CurrentPath,
  MyParsedPath,
  ParsedBase,
  ParsedDir,
  ParsedExt,
  ParsedName,
  ParsedPath,
  ParsedRoot,
  ParsedWithFlag,
  ParsedWithType,
  ParsedWithTypeAndExcludeFlag,
  WithBaseName,
  WithCount,
  WithDir,
  WithExcludeFlag,
  WithExt,
  WithExtention,
  WithExtname,
  WithFileExtname,
  WithFileName,
  WithFileType,
  WithFullPath,
  WithIndex,
  // WithPathToFile,
  WithPHash,
  WithRoot,
  WithType,
} from './FileCurrentPath';
// export type { FilePath } from './FilePath';
export type { FilePathInfo } from './FilePathInfo';
export type { GetChild } from './GetChild';
export type { GetStats } from './GetStats';
export type { IQueryListPhash, N, P, S } from './IQueryListPhash';
export type { Listing } from './Listing';
// export type { FileType } from './FileType';
export type { PathAndStats } from './PathAndStats';
export type {
  MyPInfos,
  MyStats,
  RedisJson_DirentInfoGetterFunct,
  RedisJson_InfoGetterFunct,
  RedisJson_PathInfoGetterFunct,
  RedisJson_PathStatsTuple,
  RedisJson_StatsInfoGetterFunct,
} from './PathStatsGetter';
export type { PathWithStats } from './PathWithStats';
export type { PHashedPath } from './PHashedPath';
export type { PHashedTuple } from './PHashedTuple';
export type { PhashNow } from './PhashNow';
export type { Pr } from './Pr';
export type { RedisClientType } from './RedisClientType';
export type { RedisCStrOptions } from './RedisCStrOptions';
export type { RedisQueryResult } from './RedisQueryResult';
export type { Strange } from './Strange';
export type { IsNotValidPHash, IsValidPHash, ValidPHash } from './ValidPHash';
export type {
  Excluded,
  IsExcluded,
  NotExcluded,
  WithExclude,
} from './WithExclude';
