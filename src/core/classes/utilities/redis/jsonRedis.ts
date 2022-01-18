import { Tedis } from 'tedis';

const RDSServer_6382 = (): [Tedis, () => void] => {
  const tedis = new Tedis({
    port: 6382,
  });

  return [tedis, tedis.close];
};

const jsonGetForFullKey =
  (RDSServer: Tedis) => (fullKey: string) => (jsonPath: string) =>
    jsonGet(RDSServer, fullKey, jsonPath);

const jsonGetForJsonPath =
  (RDSServer: Tedis) => (jsonPath: string) => (fullKey: string) =>
    jsonGet(RDSServer, fullKey, jsonPath);

const jsonGetForJsonPathAndKey =
  (fullKey: string, jsonPath: string) => (RDSServer: Tedis) =>
    jsonGet(RDSServer, fullKey, jsonPath);

async function jsonGet(RDSServer: Tedis, fullKey: string, jsonPath: string) {
  return RDSServer.command('JSON.GET', fullKey, jsonPath);
}
jsonGet.forFullKey = jsonGetForFullKey;
jsonGet.forJsonPath = jsonGetForJsonPath;
jsonGet.forJsonPathAndKey = jsonGetForJsonPathAndKey;

const jsonSetForFullKey =
  (RDSServer: Tedis) => (fullKey: string) => (jsonPath: string) =>
    jsonSet(RDSServer, fullKey, jsonPath);

const jsonSetForJsonPath =
  (RDSServer: Tedis) => (jsonPath: string) => (fullKey: string) =>
    jsonSet(RDSServer, fullKey, jsonPath);

function jsonSet(RDSServer: Tedis, fullKey: string, jsonPath: string) {
  return async (value: string | number | null | boolean) => {
    let val: string | number = `${value}`;
    if (value === 'null' || value === null) val = `null`;
    if (value === 'false' || value === false) val = `false`;
    if (value === 'true' || value === true) val = `true`;
    if (typeof value === 'number') val = `${value}`;
    // TODO: figureout for strings later
    if (typeof value === 'string') val = `'${value}'`;

    return RDSServer.command('JSON.SET', fullKey, jsonPath, val);
  };
}

jsonSet.forFullKey = jsonSetForFullKey;
jsonSet.forJsonPath = jsonSetForJsonPath;

export { jsonGet, jsonSet, RDSServer_6382 };
