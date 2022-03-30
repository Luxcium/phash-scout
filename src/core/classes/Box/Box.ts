import type { IApply, IBox, IChain, IMap, IUnbox, IValue } from '../types';

export default class Box<T>
  implements IApply<T>, IChain<T>, IMap<T>, IUnbox<T>, IBox<T>, IValue<T>
{
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

  // public IApply<T> ==================================-| ap() |-====
  public ap<R>(c: IMap<(val: T) => R>) {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }
  // IApply<T>, IChain<T>, IMap<T>, IUnbox<T>, IValue<T>

  // public IChain<T> ===============================-| chain() |-====
  public chain<R>(fn: (value: T) => R) {
    return this.map(fn).value;
  }

  // public IMap<T> ===================================-| map() |-====
  public map<R>(fn: (value: T) => R) {
    return Box.of(fn(this.#value));
  }

  // public IUnbox<T> ===============================-| unbox() |-====
  /** Unboxes the value inside the Functor */
  public unbox() {
    return this.#value;
  }

  // get IBox<T> ========================================-| box |-====
  public get box() {
    return Box.of(this.unbox());
  }

  // get IValue<T> ====================================-| value |-====
  public get value() {
    return this.unbox();
  }
}
export { Box };

export function boxOf<TVal>(value: TVal) {
  return Box.of(value);
}

export function boxFrom<TVal>(box: IUnbox<TVal>) {
  return Box.from(box);
}
