import { DirentWithFileType } from '../../types';
import { getCurrentPath } from '../paths';

export function currentPath(folderPath: string) {
  return (f: DirentWithFileType) => getCurrentPath(f, folderPath);
}

export async function test_currentPath() {
  console.log(currentPath('/'));
}

test_currentPath; // ();
