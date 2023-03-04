/**
 * A Redis client that supports the `send_command` method.
 */
export type RedisClient = {
  send_command: (
    command: string,
    args: Array<string | number>,
    callback: (err: any, result: any) => void
  ) => void;
};

/**
 * Adds a new image perceptual hash to the queue for later addition.
 * When the new additions reach a threshold number, the new arrivals
 * are added to the index in a batch. To add right away, immediately
 * follow up with the sync command. Returns the ID integer value
 * assigned to this image. The title string is added as a hash field
 * to the key:<id> key. Optionally, an ID integer can be appended to
 * the end of the command, but this is not the normal use.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param hashValue - The perceptual hash of the image to add.
 * @param title - The title of the image to add.
 * @param id - An optional ID to assign to the image.
 * @returns A Promise that resolves to the ID integer value assigned to the image.
 */
async function addImage(
  redisClient: RedisClient,
  key: string,
  hashValue: string,
  title: string,
  id?: number
): Promise<number> {
  return new Promise((resolve, reject) => {
    const args = [key, hashValue, title];
    if (id) args.push(id.toString());
    redisClient.send_command('imgscout.add', args, (err, result) => {
      if (err) reject(err);
      else resolve(parseInt(result));
    });
  });
}

/**
 * Adds all the recently submitted image perceptual hashes to the index.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @returns A Promise that resolves to an OK status message.
 */
async function syncImages(
  redisClient: RedisClient,
  key: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command('imgscout.sync', [key], (err, result) => {
      if (err) reject(err);
      else resolve(result.toString());
    });
  });
}

/**
 * Queries for all perceptual hash targets within a given radius.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param targetHash - The target perceptual hash to query for.
 * @param radius - The radius within which to search for matching hashes.
 * @returns A Promise that resolves to an array of results, where each item is
 * an array of two items: the title string and the ID integer.
 */
async function queryImages(
  redisClient: RedisClient,
  key: string,
  targetHash: string,
  radius: number
): Promise<Array<[string, number]>> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.query',
      [key, targetHash, radius.toString()],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const results = JSON.parse(result);
          const formattedResults = results.map((r: any) => [
            r[0],
            parseInt(r[1]),
          ]);
          resolve(formattedResults);
        }
      }
    );
  });
}

/**
 * Looks up an image by its ID.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param id - The ID of the image to look up.
 * @returns A Promise that resolves to the title of the image.
 */
async function lookupImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.lookup',
      [key, id.toString()],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.toString());
      }
    );
  });
}

/**
 * Gets the number of entries in the image index.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @returns A Promise that resolves to the number of entries in the image index.
 */
async function getImageIndexSize(
  redisClient: RedisClient,
  key: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    redisClient.send_command('imgscout.size', [key], (err, result) => {
      if (err) reject(err);
      else resolve(parseInt(result));
    });
  });
}

/**
 * Deletes an image from the image index.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param id - The ID of the image to delete.
 * @returns A Promise that resolves to an OK status message.
 */
async function deleteImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.del',
      [key, id.toString()],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.toString());
      }
    );
  });
}

/**
 * A collection of Redis-ImageScout commands.
 */
export const imagescout = {
  addImage,
  syncImages,
  queryImages,
  lookupImage,
  getImageIndexSize,
  deleteImage,
};
