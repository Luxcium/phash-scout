import { BoxedGenerator } from '../../../core/classes';

export function redis_getDirectoriesGenerator(
  path_: string,
  redis_prefix: string,
  dirList: string[]
) {
  const aGenBox = BoxedGenerator.of(...dirList.slice(0)).map(dirname_ => {
    const [key, pathStr] = [
      `${redis_prefix}::${dirname_}`,
      `${path_}/${dirname_}`,
    ];
    return [key, pathStr];
  });

  return aGenBox;
}
