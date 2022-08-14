// export const validExts = new Set(['.png', '.jpeg', '.jpg', '.webp']);
export const reduceQuerryResults = ({
  radius,
  diff,
  fullPath,
}: {
  radius: number;
  diff: number;
  fullPath: string;
}) => {
  return {
    radius,
    diff,
    fullPath,
  };
};

// group,
// hSize,
// file,
// dir,
// path,
// id,
// size,
// ext,
