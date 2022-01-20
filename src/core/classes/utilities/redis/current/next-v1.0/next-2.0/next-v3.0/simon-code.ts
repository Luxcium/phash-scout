import { readdir, readFile } from 'fs/promises';
import { createClient } from 'redis';
import { redisConnectionString } from '../../../../tools';

type RedisClientType = ReturnType<typeof createClient>;
type WriterTool = (
  redisClient: RedisClientType,
  filePath: string
) => Promise<'OK' | null>;

export function getSpiderFolder(
  redisClient: RedisClientType,
  writerTool: WriterTool
) {
  return async function spiderFolder(folderPath: string) {
    const dirEntries = await readdir(folderPath, {
      withFileTypes: true,
    });

    for (const dirEntry of dirEntries) {
      if (dirEntry.isDirectory()) {
        await spiderFolder(`${folderPath}/${dirEntry.name}`);
      } else if (dirEntry.isFile()) {
        const filePath = `${folderPath}/${dirEntry.name}`;
        await writerTool(redisClient, filePath);
      }
    }
  };
}

export const WriterTool: WriterTool = async (
  redisClient: RedisClientType,
  filePath: string
) => {
  const fileContents = await readFile(filePath);
  const result = await redisClient.json.set(
    `file:${filePath}`,
    '$',
    JSON.parse(fileContents.toString())
  );

  console.log(filePath);
  console.log(fileContents.toString());

  return result;
};

async function runApplication(port: number, _path: string) {
  try {
    const client = createClient(redisConnectionString({ port }));
    await client.connect();

    const spiderFolder = getSpiderFolder(client, WriterTool);
    await spiderFolder(_path);

    await client.disconnect();
  } catch (e) {
    console.error(e);
  }
}

const PATH =
  '/home/luxcium/src/parallel-mapping/src/core/classes/utilities/redis/current/next-v1.0/nest-2.0/next-v3.0/data';
const PORT = 6382;
runApplication(PORT, PATH);

// ---------------------------------------------------------------------//!!-----
// ++ Modified from: redis-json-directory-spider -----------------------
// https://github.com/simonprickett/redis-json-directory-spider/LICENSE
// + Copyright © 2022 Simon Prickett [MIT or MIT Like]
