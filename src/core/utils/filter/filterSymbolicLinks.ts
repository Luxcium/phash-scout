import { DirentWithFileType } from '../../types';

export function filterSymbolicLinks(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isSymbolicLink);
  }

  return element.isSymbolicLink;
}
