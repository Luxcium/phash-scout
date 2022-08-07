type Tedis = any;
const Tedis: Tedis = null;
export type SetJsonArgs = {
  prefix: string;
  jsonPath: string;
  keyID: string;
  value: string | number;
  RDSServer: Tedis;
};
