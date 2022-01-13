import { Tedis } from 'tedis';

/*
 + Glosaire:
 - RDSS: Redis Data Structures Server
 */

/**********************************************************************
 * In a prefix space (name space) create a getter for a specif RDSS to
 * retrive the value for specific key (ID) on a predetermined jsonPath.
 **********************************************************************/
export const tedis_jsonGet =
  (prefix: string) =>
  (jsonPath: string = '.') =>
  (RDSServer: Tedis) =>
  (key: string) =>
    (async () =>
      RDSServer.command('JSON.GET', `${prefix}::${key}`, jsonPath))();

/**********************************************************************
 * In a prefix space (name space) activated for a specific RDSS create
 * a setter for a specific key (ID) to wich diferent jsonPaths will be
 * asigned a value.
 **********************************************************************/
export const tedis_jsonSet =
  (prefix: string) =>
  (RDSServer: Tedis) =>
  (key: string) =>
  (jsonPath: string) =>
  (value: string) =>
    (async () =>
      RDSServer.command('JSON.SET', `${prefix}::${key}`, jsonPath, value))();
