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
