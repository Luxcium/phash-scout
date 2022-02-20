import { DirentWithFileType } from '../../../types';

export function filterFIFOs(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isFIFO);
  }

  return element.isFIFO;
}
