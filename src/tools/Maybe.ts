export class MayBe<T> {
  public static of<TVal>(val?: TVal) {
    return new MayBe(val);
  }

  private _value!: T;

  public constructor(val?: T) {
    if (val) {
      this._value = val;
    }
  }

  public isNothing() {
    return this._value === null || this._value === undefined;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return this.isNothing()
      ? new MayBe<TMap>()
      : new MayBe<TMap>(fn(this._value));
  }

  public ap<TMap>(c: MayBe<(val: T) => TMap>) {
    return c.map(fn => this.map(fn));
  }
}

export type Either<E, T> = Nothing<E> | Right<T>;

export class Nothing<T> {
  public static of<TVal>(val?: TVal) {
    return new Nothing(val);
  }

  private _value: T | undefined;

  public constructor(val?: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return this._value !== undefined
      ? new Nothing<TMap>(fn(this._value))
      : new Nothing<TMap>(this._value as any);
  }
}
export class Right<T> {
  public static of<TVal>(val: TVal) {
    return new Right(val);
  }

  private _value: T;

  public constructor(val: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Right<TMap>(fn(this._value));
  }
}
