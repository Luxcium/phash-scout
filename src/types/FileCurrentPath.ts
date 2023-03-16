import { FileType } from '../tools';
import { IsNotValidPHash, IsValidPHash } from './ValidPHash';
import { WithExclude } from './WithExclude';

/** @deprecated */
export type ParsedWithTypeAndExcludeFlag = ParsedWithType & ParsedWithFlag;
export type ParsedWithType = MyParsedPath & WithType;
export type ParsedWithFlag = MyParsedPath & WithExcludeFlag;
export type CurrentPath = WithFileName &
  WithFileExtname &
  WithBaseName &
  WithFullPath &
  WithExtname &
  WithDir &
  WithExt &
  WithExclude &
  WithFileType;

export type WithRoot = {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
};
export type WithDir = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithBaseName = {
  baseName: string;
};
export type WithFileName = {
  fileName: string;
};
/** @deprecated use {@link WithDir} instead */
export type WithPathToFile = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithFullPath = {
  fullPath: string;
};
export type WithFileExtname = {
  extname: string;
};

export type WithExtname = {
  extname: string;
};
export type WithExt = {
  ext: string;
};

/** @deprecated */
export type WithExtention = WithExtname & WithExt;

export type WithFileType = {
  type: FileType;
};
export type WithType = {
  type: FileType;
};
export type WithPHash = IsValidPHash | IsNotValidPHash;

/** @deprecated */
export type WithCount = {
  count: number;
};

export type WithIndex = {
  index: number;
};
export type WithExcludeFlag = {
  exclude: boolean;
};
export type MyParsedPath = WithFullPath &
  WithDir &
  WithFileName &
  WithBaseName &
  WithExt &
  WithExtname &
  WithRoot;

export interface ParsedPath {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
  /**
   * The file name including extension (if any) such as 'index.html'
   */
  base: string;
  /**
   * The file extension (if any) such as '.html'
   */
  ext: string;
  /**
   * The file name without extension (if any) such as 'index'
   */
  name: string;
}

/** @deprecated */
export interface ParsedRoot {
  ParsedPath: { root: string };
}
/** @deprecated */
export interface ParsedDir {
  ParsedPath: { dir: string };
}
/** @deprecated */
export interface ParsedBase {
  ParsedPath: { base: string };
}
/** @deprecated */
export interface ParsedExt {
  ParsedPath: { ext: string };
}
/** @deprecated */
export interface ParsedName {
  ParsedPath: { name: string };
}

/** @deprecated */
export interface BaseRoot {
  root: string;
}
/** @deprecated */
export interface BasedDir {
  dir: string;
}
/** @deprecated */
export interface BaseBase {
  base: string;
}
export interface BasedExt {
  ext: string;
}
/** @deprecated */
export interface BaseName {
  name: string;
}
