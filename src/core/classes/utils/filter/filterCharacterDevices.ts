import { DirentWithFileType } from '../../../types';

export function filterCharacterDevices(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isCharacterDevice);
  }

  return element.isCharacterDevice;
}
