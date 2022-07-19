import { link, lstat } from 'fs/promises';
import { getPathInfos } from '../tools';

export function extractGifs(fullPath: string) {
  const infos = getPathInfos(fullPath).parsed();
  const destination =
    '/media/luxcium/D:\\ Archive locale/import/GAYBOYSTUBE/gifs';
  if (['.GIF'].some(ext => ext.toLowerCase() === infos.ext.toLowerCase())) {
    const longFileName = fullPath
      .split('/GAYBOYSTUBE/users/')[1]
      .split('/')
      .slice(1)
      .join('_');
    const newPath = destination + '/' + longFileName;
    lstat(newPath).then(
      async () => {
        console.log(longFileName);
        await link(fullPath, newPath);
      },
      error => console.error(error)
    );
  }
}
