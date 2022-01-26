import * as RTE from 'fp-ts/ReaderTaskEither';
import { FileSystem } from './FileSystem';
interface Build<A> extends RTE.ReaderTaskEither<FileSystem, Error, A> {
}
export declare const copyPackageJson: Build<void>;
export declare const FILES: ReadonlyArray<string>;
export declare const copyFiles: Build<ReadonlyArray<void>>;
export declare const makeModules: Build<void>;
export {};
