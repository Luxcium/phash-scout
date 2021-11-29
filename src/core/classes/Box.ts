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

export class Box4<T> {
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

export class Box5<T> {
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

export class Box6<T> {
  #value: T;

  public static of<TVal>(value: TVal) {
    return new Box6(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }

  public map<R>(fn: (value: T) => R) {
    return Box6.of(fn(this.#value));
  }
  public unbox() {
    return this.#value;
  }

  public get value() {
    return this.unbox();
  }
}

export class Box7<T> {
  #value: T;

  public static of<TVal>(value: TVal) {
    return new Box7(value);
  }
  protected constructor(value: T) {
    this.#value = value;
    return this;
  }

  public map<R>(fn: (value: T) => R) {
    return Box7.of(fn(this.#value));
  }

  public ap<R>(c: Box8<(val: T) => R>) {
    return c.map(fn => this.map(fn).value);
  }
  public unbox() {
    return this.#value;
  }

  public get value() {
    return this.unbox();
  }
}
