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
