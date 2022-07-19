import * as fsSync from 'node:fs';
import * as fs from 'node:fs/promises';

/*
 const thisImage = fs.promises.readFile(imgFile.fullPath);
      return {
        await: {
          getPHash: async () => {
            return immediateZalgo({
              pHash: bigString(sharpPhash(await thisImage)),
              exclude: false,
            });
          },
        },
      };
 */
export async function isDir(dir: string) {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function isDirSync(dir: string) {
  try {
    const stats = fsSync.statSync(dir);
    return stats.isDirectory();
  } catch (error) {
    console.error(error);
    return null;
  }
}
