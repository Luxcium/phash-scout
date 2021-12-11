import type { IApply, IChain, IMap, IUnbox } from './types';

export function boxOf<TVal>(value: TVal) {
  return Box.of(value);
}

export function boxFrom<TVal>(box: IUnbox<TVal>) {
  return Box.from(box);
}
class Box<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;
  private boxedValue: T;
  public static of<TVal>(value: TVal) {
    return new Box(value);
  }

  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box(box.unbox());
  }
  protected constructor(value: T) {
    this.boxedValue = value;
    this.#value = this.boxedValue;
    return this;
  }

  public unbox() {
    return this.#value;
  }

  public map<R>(fn: (value: T) => R) {
    return Box.of(fn(this.#value));
  }

  public ap<R>(c: IMap<(val: T) => R>) {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }
  public chain<R>(fn: (value: T) => R) {
    return this.map(fn).value;
  }

  public get value() {
    return this.unbox();
  }
}
export { Box };

export function maiTest(debug: boolean = false) {
  if (!debug) return false;
  const box1 = Box.of('Chocolates');
  const box2 = Box.from(box1);
  console.log('box1:', box1);
  console.log('box2:', box2);
  console.log(
    'box2 length:',
    box2.map(i => i.length)
  );

  box2.unbox();
  box2.map(i => i.length);
  box2.ap(Box.of(i => i.length));
  box2.chain(i => i.length);
  box2.value;
  return true;
}

maiTest(true);
