import { Box } from './Box';
import type { IMapList, IUnbox, IUnboxList } from './types';

export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapList<T> {
  #value: T[];

  public static of = <TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) {
        return new BoxedList<TVal>([...value]);
      }
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  };

  public static from<TVal>(box: IUnbox<TVal[] | TVal> | IUnboxList<TVal>) {
    return BoxedList.of(box.unbox());
  }
  protected constructor(value: T[]) {
    this.#value = value;
    return this;
  }

  public unbox<R_unsafe = T>() {
    return this.#value as any as R_unsafe[];
  }

  public mapList<R>(fn: (value: T) => R) {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  public ap<R_Unsafe>(
    c: IUnbox<(val: T) => R_Unsafe> | IUnboxList<(val: any) => unknown>
  ) {
    const unboxed = c.unbox();
    let funct: (val: any) => unknown = i => i;

    if (Array.isArray(unboxed)) {
      funct = unboxed.reduce(
        (previousFn, currentFunct): ((val: T) => unknown) =>
          placeHolder =>
            currentFunct(previousFn(placeHolder)),
        funct
      ) as (val: T) => R_Unsafe;
      return this.mapList(val => funct(val) as R_Unsafe);
    }
    return this.mapList(val => unboxed(val) as R_Unsafe);
  }
  public chain<R>(fn: (value: T) => R) {
    return this.mapList<R>(fn).unbox<R>();
  }
  get box() {
    return Box.of([...this.unbox<T>()]);
  }
  public get value() {
    return this.unbox<T>();
  }
}

function main() {
  const values = BoxedList.of(1, 2, 3, 4, 5);
  const functions = BoxedList.of(
    (i: number) => i,
    (n: number) => n + 1,
    (n: number) => n * 2,
    (n: number) => n - 2,
    (n: number) => n + n
  );
  const results = values.ap<number>(functions);
  const oneMoreTime = Box.of((n: number) => n * 2);
  return results.ap(oneMoreTime).chain(v => console.log(v));
}
void main; //();

const value = 2;
const pseudoCode = (i: number): number => i;
[pseudoCode(value)]
  .map(x => x * 2)
  .map(y => y + 3)
  .map(anything => anything - 7)
  .map(itWasNotAsTrivialAsThisExample => 0 / itWasNotAsTrivialAsThisExample);
