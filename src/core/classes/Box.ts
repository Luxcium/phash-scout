export class Box1<T> {
  value: T;
}

export class Box2<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
    return this;
  }
}

export class Box3<T> {
  value: T;

  public static of<TVal>(value: TVal) {
    return new Box3(value);
  }
  protected constructor(value: T) {
    this.value = value;
    return this;
  }
}

export interface IUnbox<T> {
  unbox(): T;
}

export class Box4<T> implements IUnbox<T> {
  value: T;

  public static of<TVal>(value: TVal) {
    return new Box4(value);
  }
  protected constructor(value: T) {
    this.value = value;
    return this;
  }

  public unbox() {
    return this.value;
  }
}

export class Box5<T> implements IUnbox<T> {
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

  public get value() {
    return this.unbox();
  }
}
export interface IMap<T> extends IUnbox<T> {
  map<R>(fn: (value: T) => R): IUnbox<R>;
}
export class Box6<T> implements IUnbox<T>, IMap<T> {
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

  public get value() {
    return this.unbox();
  }
}

export interface IApply<T> extends IMap<T> {
  ap<R>(c: IMap<(val: T) => R>): IApply<R> & IUnbox<R> & IMap<R>;
}
export class Box7<T> implements IUnbox<T>, IMap<T>, IApply<T> {
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

  public get value() {
    return this.unbox();
  }
}

export interface IChain<T> extends IMap<T> {
  chain<R>(fn: (value: T) => R): R;
}
export class Box8<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;

  public static of<TVal>(value: TVal) {
    return new Box8(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }
  public unbox() {
    return this.#value;
  }
  public map<R>(fn: (value: T) => R) {
    return Box8.of(fn(this.#value));
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

export class Box9<T> implements IUnbox<T>, IMap<T>, IApply<T>, IChain<T> {
  #value: T;

  public static of<TVal>(value: TVal) {
    return new Box9(value);
  }

  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box9(box.unbox());
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }

  public unbox() {
    return this.#value;
  }

  public map<R>(fn: (value: T) => R) {
    return Box9.of(fn(this.#value));
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
