import * as TE from 'fp-ts/TaskEither';
export interface FileSystem {
    readonly readFile: (path: string) => TE.TaskEither<Error, string>;
    readonly writeFile: (path: string, content: string) => TE.TaskEither<Error, void>;
    readonly copyFile: (from: string, to: string) => TE.TaskEither<Error, void>;
    readonly glob: (pattern: string) => TE.TaskEither<Error, ReadonlyArray<string>>;
    readonly mkdir: (path: string) => TE.TaskEither<Error, void>;
    readonly moveFile: (from: string, to: string) => TE.TaskEither<Error, void>;
}
export declare const fileSystem: FileSystem;
