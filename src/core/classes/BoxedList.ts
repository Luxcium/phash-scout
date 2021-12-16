import { Either, left, right } from 'fp-ts/lib/Either';
import { Box } from './Box';
import type { IMapItems, IUnbox, IUnboxList } from './types';

export function boxedListOf<TVal>(value: TVal) {
  return BoxedList.of(value);
}

export function boxedListFrom<TVal>(box: IUnbox<TVal>) {
  return BoxedList.from(box);
}
export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
  #value: T[];

  // static ==============================================-| of() |-====
  public static of = <TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) {
        return new BoxedList<TVal>([...value]);
      }
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  };

  // static ============================================-| from() |-====
  // TVal[] | [TVal[]] // [] | [TVal[]]
  // : BoxedList<TVal> // <TVal>
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ) {
    const unbox: TVal | TVal[] = box.unbox();
    return BoxedList.of<TVal>(unbox as TVal);
  }
  // protected ==================================-| constructor() |-====
  protected constructor(value: T[]) {
    this.#value = value;
    return this;
  }

  // public ===========================================-| unbox() |-====
  public unbox<R_unsafe = T>() {
    return this.#value as any as R_unsafe[];
  }

  // public ========================================-| mapItems() |-====
  public map<R>(fn: (value: T[]) => R[]) {
    return BoxedList.of<R>(...fn(this.#value));
  }

  // public ========================================-| mapItems() |-====
  public mapItems<R>(fn: (value: T) => R) {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  // *- ================================================================
  // public ========================================-| mapLists() |-====
  public mapLists<R>(fn: (val: T) => R) {
    const value = this.#value;

    const mapedValues = value.map(item => {
      const listBox = BoxedList.of(item);
      return listBox.mapItems(fn).unbox();
    });
    return BoxedList.of(...mapedValues);
  }
  // *- ================================================================

  // public ==============================================-| ap() |-====
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
      return this.mapItems(val => funct(val) as R_Unsafe);
    }
    return this.mapItems(val => unboxed(val) as R_Unsafe);
  }
  // public ===========================================-| chain() |-====
  public chain<R>(fn: (value: T) => R) {
    return this.mapItems<R>(fn).unbox<R>();
  }
  // public =============================================-| box() |-====
  get box() {
    return Box.of([...this.unbox<T>()]);
  }

  public get isArrayList() {
    return this.values.every(item => Array.isArray(item));
  }

  public getArrayList<R>(): Either<T[], R[][]> {
    if (this.isArrayList) {
      return right(this.values as never as R[][]);
    }
    return left(this.values as T[]);

    // return this.value.every(item => Array.isArray(item));
  }
  // get ===============================================-| values |-====
  public get values() {
    return this.unbox<T>();
  }
  // *--================================================================
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

  const value = 2;
  const pseudoCode = (i: number): number => i;
  [pseudoCode(value)]
    .map(x => x * 2)
    .map(y => y + 3)
    .map(anything => anything - 7)
    .map(itWasNotAsTrivialAsThisExample => 0 / itWasNotAsTrivialAsThisExample);

  return results.ap(oneMoreTime).chain(v => console.log(v));
}
void main; //();
// function testing_001<T>(...value: T[]) {
//   return testing_002(value);
// }
// function testing_002<TVal>(...values: TVal[] | [TVal[]]) {
//   if (values.length === 1) {
//     const value = values[0];

//     if (Array.isArray(value)) {
//       return [...value];
//     }
//   }
//   return [...(values as TVal[])];
// }

// console.log(testing_001('a'));
