import type { IApply, IChain, IMap, IUnbox } from './types';

const debug = false;
export function boxOf<TVal>(value: TVal) {
  return Box.of(value);
}

export function boxFrom<TVal>(box: IUnbox<TVal>) {
  return Box.from(box);
}

class Box<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;
  private boxedValue: T;

  // static ==============================================-| of() |-====
  public static of<TVal>(value: TVal) {
    return new Box(value);
  }

  // static ============================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box(box.unbox());
  }

  // protected ==================================-| constructor() |-====
  protected constructor(value: T) {
    this.boxedValue = value;
    this.#value = this.boxedValue;
    return this;
  }

  // public =============================================-| map() |-====
  public map<R>(fn: (value: T) => R) {
    return Box.of(fn(this.#value));
  }

  // public ==============================================-| ap() |-====
  public ap<R>(c: IMap<(val: T) => R>) {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }

  // public ===========================================-| chain() |-====
  public chain<R>(fn: (value: T) => R) {
    return this.map(fn).value;
  }

  // public ===========================================-| unbox() |-====
  public unbox() {
    return this.#value;
  }
  public get box() {
    return Box.of(this.unbox());
  }
  // get ===============================================-| values |-====
  public get value() {
    return this.unbox();
  }
}
export { Box };

export function maiTest(debug: boolean = false) {
  if (!debug) return false;
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

maiTest(debug);
