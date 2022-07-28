import path from 'path';
import Piscina from 'piscina';

const piscina = new Piscina({
  filename: path.resolve(
    '/home/luxcium/projects/pHashScout/out/src/API',
    'worker.js'
  ),
});

(async function () {
  const result = await piscina.run({ a: 4, b: 6 });
  console.log(result); // Prints 10
})();
