import type { IApply, IChain, IMap, IUnbox } from './types';

class Box<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;

  public static of<TVal>(value: TVal) {
    return new Box(value);
  }

  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box(box.unbox());
  }
  protected constructor(value: T) {
    this.#value = value;
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
