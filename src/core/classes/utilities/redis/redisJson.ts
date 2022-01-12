import { Tedis } from 'tedis';
import { getTedisTools } from './getTedisTools';

export const set =
  (tedis: Tedis) =>
  (key: string) =>
  (jsonPath: string = '.') =>
  async (value: string) => {
    console.log(
      'tedis.command(',
      'JSON.SET',
      `${key}`,
      `${jsonPath}`,
      `${value}`,
      ')'
    );
    return tedis.command('JSON.SET', `${key}`, `${jsonPath}`, `${value}`);
  };
export const get =
  (tedis: Tedis) =>
  (key: string) =>
  async (jsonPath: string = '.') =>
    tedis.command('JSON.GET', key, jsonPath);
export const init = (tedis: Tedis) => async (key: string) =>
  tedis.command('JSON.SET', key, '.', `{}`);

export const tedisTools = (tedis: Tedis) => ({
  json: { get: get(tedis), set: set(tedis), init: init(tedis) },
});

export const REDIS_PREFIX = 'JSON::GBT_PATH::';

async function main() {
  console.log('main in :', __filename);

  const tedis = getTedisTools();
  // await set(tedis)('key002')('.banane')(`42`);
  // tedis.command('JSON.SET', key, jsonPath, `${value}`);
  // await tedis.command(`JSON.SET`, 'key002', '.banane', `42`);
  return tedis.close();
  // return false;
}
void main;
// main();
