import { Box, BoxedList } from '..';

describe('Testing Box specification', () => {
  test('BoxedList of one item', () => {
    expect(BoxedList.of('Chocolates')).toStrictEqual(
      BoxedList.of(['Chocolates'])
    );
  });
  test('BoxedList of many items', () => {
    expect(BoxedList.of(1, 2, 3, 4, 5, 6, 7, 8, 9)).toStrictEqual(
      BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });
  test('BoxedList of one array', () => {
    expect(BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual(
      BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });

  test('BoxedList of an array with one item', () => {
    expect(BoxedList.of([[1, 2, 3, 4, 5, 6, 7, 8, 9]])).toStrictEqual(
      BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });

  test('BoxedList of nested arrays', () => {
    expect(BoxedList.of([[[1, 2, 3, 4, 5, 6, 7, 8, 9]]])).toStrictEqual(
      BoxedList.of([[1, 2, 3, 4, 5, 6, 7, 8, 9]])
    );
  });

  test('BoxedList from', () => {
    const boxedlist = BoxedList.of('Chocolates');

    expect(BoxedList.from(boxedlist)).toStrictEqual(BoxedList.of('Chocolates'));
  });
  //   box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>

  test('BoxedList from IUnbox<TVal>', () => {
    const box = Box.of('Chocolates');

    expect(BoxedList.from(box)).toStrictEqual(BoxedList.of('Chocolates'));
  });

  test('BoxedList from IUnbox<TVal[]>', () => {
    const box = Box.of(['Chocolates']);

    expect(BoxedList.from(box)).toStrictEqual(BoxedList.of('Chocolates'));
  });
  test('BoxedList from', () => {
    const boxedlist = BoxedList.of('Chocolates');

    expect(BoxedList.from(boxedlist)).toStrictEqual(BoxedList.of('Chocolates'));
  });
  test('BoxedList map', () => {
    const boxedlist = BoxedList.of(12, 13, 14);
    expect(boxedlist.mapItems((val: number) => val * 2 + 1)).toStrictEqual(
      BoxedList.of(12 * 2 + 1, 13 * 2 + 1, 14 * 2 + 1)
    );
  });

  test('BoxedList ap', () => {
    const boxedlist = BoxedList.of(12);
    expect(
      boxedlist.ap(BoxedList.of([(val: number) => val * 2 + 1]))
    ).toStrictEqual(BoxedList.of(12 * 2 + 1));
  });

  test('BoxedList chain', () => {
    const boxedlist = BoxedList.of(12);
    expect(boxedlist.chain(val => val * 1 + 0)).toStrictEqual([12]);
  });

  test('BoxedList unbox', () => {
    const boxedlist = BoxedList.of('Chocolates');
    expect(boxedlist.unbox()).toStrictEqual(['Chocolates']);
  });

  test('BoxedList value', () => {
    const boxedlist = BoxedList.of('Chocolates');
    expect(boxedlist.values).toStrictEqual(['Chocolates']);
  });
});

// public static of
// public static from
// // public ====
// public unbox<R_unsafe
// // public ====
// public mapItems<R
// // public ====
// public mapLists<R
// // public ====
// public ap<R_Unsafe
// // public ====
// public chain<R
// // public ====
// public get isArrayList
// public getArrayList<R
// public get values

// import { Either, left, right } from 'fp-ts/lib/Either';
// import { Box } from './Box';
// import type { IMapItems, IUnbox, IUnboxList } from './types';

// export function boxedListOf<TVal>(value: TVal) {
//   return BoxedList.of(value);
// }

// export function boxedListFrom<TVal>(box: IUnbox<TVal>) {
//   return BoxedList.from(box);
// }
// export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
//   #value: T[];

//   // static ==============================================-| of() |-====
//   // public static of = <TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> => {
//     if (values.length === 1) {
//       const value = values[0];

//       if (Array.isArray(value)) {
//         return new BoxedList<TVal>([...value]);
//       }
//     }
//     return new BoxedList<TVal>([...(values as TVal[])]);
//   };

//   // static ============================================-| from() |-====
//   // public static from<TVal>(box: IUnbox<TVal[] | TVal> | IUnboxList<TVal>) {
//     return BoxedList.of(box.unbox());
//   }
//   // protected ==================================-| constructor() |-====
//   protected constructor(value: T[]) {
//     this.#value = value;
//     return this;
//   }

//   public ===========================================-| unbox() |-====
//   // public unbox<R_unsafe = T>() {
//     return this.#value as any as R_unsafe[];
//   }

//   public ========================================-| mapItems() |-====
//   // public mapItems<R>(fn: (value: T) => R) {
//     return BoxedList.of<R>(...this.#value.map(fn));
//   }

//   // *- ================================================================
//   public ========================================-| mapLists() |-====
//   // public mapLists<R>(fn: (val: T) => R) {
//     const value = this.#value;

//     const mapedValues = value.map(item => {
//       const listBox = BoxedList.of(item);
//       return listBox.mapItems(fn).unbox();
//     });
//     return BoxedList.of(...mapedValues);
//   }
//   // *- ================================================================

//   public ==============================================-| ap() |-====
//   // public ap<R_Unsafe>(
//     c: IUnbox<(val: T) => R_Unsafe> | IUnboxList<(val: any) => unknown>
//   ) {
//     const unboxed = c.unbox();
//     let funct: (val: any) => unknown = i => i;

//     if (Array.isArray(unboxed)) {
//       funct = unboxed.reduce(
//         (previousFn, currentFunct): ((val: T) => unknown) =>
//           placeHolder =>
//             currentFunct(previousFn(placeHolder)),
//         funct
//       ) as (val: T) => R_Unsafe;
//       return this.mapItems(val => funct(val) as R_Unsafe);
//     }
//     return this.mapItems(val => unboxed(val) as R_Unsafe);
//   }
//   public ===========================================-| chain() |-====
//   // public chain<R>(fn: (value: T) => R) {
//     return this.mapItems<R>(fn).unbox<R>();
//   }
//   public =============================================-| box() |-====
//   get box() {
//     return Box.of([...this.unbox<T>()]);
//   }

//   // public get isArrayList() {
//     return this.values.every(item => Array.isArray(item));
//   }

//   // public getArrayList<R>(): Either<T[], R[][]> {
//     if (this.isArrayList) {
//       return right(this.values as never as R[][]);
//     }
//     return left(this.values as T[]);

//     // return this.value.every(item => Array.isArray(item));
//   }
//   // get ===============================================-| values |-====
//   // public get values() {
//     return this.unbox<T>();
//   }
//   // *--================================================================
// }

// function main() {
//   const values = BoxedList.of(1, 2, 3, 4, 5);
//   const functions = BoxedList.of(
//     (i: number) => i,
//     (n: number) => n + 1,
//     (n: number) => n * 2,
//     (n: number) => n - 2,
//     (n: number) => n + n
//   );
//   const results = values.ap<number>(functions);
//   const oneMoreTime = Box.of((n: number) => n * 2);

//   const value = 2;
//   const pseudoCode = (i: number): number => i;
//   [pseudoCode(value)]
//     .map(x => x * 2)
//     .map(y => y + 3)
//     .map(anything => anything - 7)
//     .map(itWasNotAsTrivialAsThisExample => 0 / itWasNotAsTrivialAsThisExample);

//   return results.ap(oneMoreTime).chain(v => console.log(v));
// }
// void main; //();
