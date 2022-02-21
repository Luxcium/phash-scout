import { DirentWithFileType } from '../../types';

export function filterSockets(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isSocket);
  }

  return element.isSocket;
}
