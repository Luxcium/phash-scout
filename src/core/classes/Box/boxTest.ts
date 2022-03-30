import { Box } from './Box';

export function test(debug: boolean = false) {
  if (!debug) {
    return false;
  }
  const box1 = Box.of('Chocolates');
  const box2 = Box.from(box1);
  console.log('Box.of:', box1);
  console.log('Box.from:', box2);
  console.log(
    'box2 length:',
    box2.map(i => i.length)
  );

  console.log('box2.unbox', box2.unbox());
  console.log(
    'box2.map',
    box2.map(i => i.length)
  );
  console.log(
    'box2.ap',
    box2.ap(Box.of(i => i.length)).map(l => l * 2)
  );
  console.log(
    'box2.chain',
    box2.chain(i => i.length)
  );
  console.log('box2.value', box2.value);
  return true;
}
