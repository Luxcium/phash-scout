import fs from 'fs';
import { PathWithStats, PHashGet } from '../../types';
import { immediateZalgo } from '../../utils';
import { bigString } from '../bigString';
import { notExcluded } from '../notExclude';

const sharpPhash = require('sharp-phash');

export function makePHashGetter<T extends PathWithStats>(imgFile: T): PHashGet {
  try {
    if (notExcluded(imgFile)) {
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
    }
  } catch (error) {
    console.error(
      error,
      'Error with file at imgFile:',
      imgFile.fullPath,
      imgFile
    );
  }
  //++ implied else and catched error return here: -------------------
  return {
    await: {
      getPHash: async () => {
        return immediateZalgo({
          pHash: null,
          exclude: true,
        });
      },
    },
  };
  //++ ---------------------------------------------------------------
}
