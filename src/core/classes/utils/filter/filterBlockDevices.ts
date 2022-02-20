import { DirentWithFileType } from '../../../types';

export function filterBlockDevices(
  element: DirentWithFileType | DirentWithFileType[]
): boolean | DirentWithFileType[] {
  if (Array.isArray(element)) {
    return element.filter(item => item.isBlockDevice);
  }

  return element.isBlockDevice;
}
