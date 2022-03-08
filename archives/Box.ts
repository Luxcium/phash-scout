import { IApply, IChain, IMap, IUnbox } from '../src/core/types';
class Box1<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
    return this;
  }
}
class Box2<T> {
  value: T;
  public static of<TVal>(value: TVal) {
    return new Box2(value);
  }
  protected constructor(value: T) {
    this.value = value;
    return this;
  }
}
class Box3<T> implements IUnbox<T> {
  value: T;
  public static of<TVal>(value: TVal) {
    return new Box3(value);
  }
  protected constructor(value: T) {
    this.value = value;
    return this;
  }
  public unbox() {
    return this.value;
  }
}
class Box4<T> implements IUnbox<T> {
  #value: T;
  public static of<TVal>(value: TVal) {
    return new Box4(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }
  public unbox() {
    return this.#value;
  }
  public get value() {
    return this.unbox();
  }
}
class Box5<T> implements IUnbox<T>, IMap<T> {
  #value: T;
  public static of<TVal>(value: TVal) {
    return new Box5(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }
  public unbox() {
    return this.#value;
  }
  public map<R>(fn: (value: T) => R) {
    return Box5.of(fn(this.#value));
  }
  public get value() {
    return this.unbox();
  }
}
class Box6<T> implements IUnbox<T>, IMap<T>, IApply<T> {
  #value: T;
  public static of<TVal>(value: TVal) {
    return new Box6(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }
  public unbox() {
    return this.#value;
  }
  public map<R>(fn: (value: T) => R) {
    return Box6.of(fn(this.#value));
  }
  public ap<R>(c: IMap<(val: T) => R>) {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }
  public get value() {
    return this.unbox();
  }
}
class Box7<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;
  public static of<TVal>(value: TVal) {
    return new Box7(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }
  public unbox() {
    return this.#value;
  }
  public map<R>(fn: (value: T) => R) {
    return Box7.of(fn(this.#value));
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
void Box1, Box2, Box3, Box4, Box5, Box6, Box7;
