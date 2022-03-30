import type { IApply, IChain, IMap, IUnbox, IValue } from '../types';
import { test } from './boxTest';

const debug = false;
export function boxOf<TVal>(value: TVal) {
  return Box.of(value);
}

export function boxFrom<TVal>(box: IUnbox<TVal>) {
  return Box.from(box);
}

class Box<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T>, IValue<T> {
  #value: T;
  private boxedValue: T;

  // static ============================================-| of() |-====
  public static of<TVal>(value: TVal) {
    return new Box(value);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box(box.unbox());
  }

  // protected ================================-| constructor() |-====
  protected constructor(value: T) {
    this.boxedValue = value;
    this.#value = this.boxedValue;
    return this;
  }

  // public ===========================================-| map() |-====
  public map<R>(fn: (value: T) => R) {
    return Box.of(fn(this.#value));
  }

  // public ============================================-| ap() |-====
  public ap<R>(c: IMap<(val: T) => R>) {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }

  // public =========================================-| chain() |-====
  public chain<R>(fn: (value: T) => R) {
    return this.map(fn).value;
  }

  // public =========================================-| unbox() |-====
  public unbox() {
    return this.#value;
  }
  // get ================================================-| box |-====
  public get box() {
    return Box.of(this.unbox());
  }
  // get ==============================================-| value |-====
  public get value() {
    return this.unbox();
  }
}
export { Box };

test(debug);
