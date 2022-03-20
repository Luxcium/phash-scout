import { Box, BoxedList } from '.';
import { Mapper, ThenMapper } from '../..';
import { immediateZalgo } from '../utils';
import { IUnbox, IUnboxList } from './types';
const DEBUG = false;
if (DEBUG) console.error('DEBUG = true in:', __filename);

export class BoxedGenerator<T> implements IUnboxList<T>, IUnbox<T[]> {
  #valueGenerator: () => Generator<T>;
  // static ============================================-| of() |-====

  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
    const arrayGenerator = (array: TVal[]): (() => Generator<TVal>) =>
      function* (): Generator<TVal> {
        for (const currentValue of array) {
          yield currentValue;
        }
      };
    if (values.length === 1) {
      const list = values[0];
      return Array.isArray(list)
        ? new BoxedGenerator<TVal>(arrayGenerator(list))
        : new BoxedGenerator<TVal>(
            arrayGenerator([list])
          ); /* as BoxedGenerator<TVal>; */
    } else {
      const list: TVal = [...values] as any;
      return BoxedGenerator.of<TVal>(list); /* as PseudoCode<TVal>; */
    }
  }

  /** @deprecated */
  public static of2<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
    const arrayGenerator = (array: TVal[]): (() => Generator<TVal>) =>
      function* (): Generator<TVal> {
        for (const currentValue of array) {
          yield currentValue;
        }
      };

    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedGenerator<TVal>(arrayGenerator([...list]));
      }
    }

    return new BoxedGenerator<TVal>(arrayGenerator([...(values as TVal[])]));
  }

  // static =======================================-| fromGen() |-====
  public static fromGen<TVal>(
    generatorFn: () => Generator<TVal>
  ): BoxedGenerator<TVal> {
    return new BoxedGenerator<TVal>(generatorFn);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(
    boxedList: IUnboxList<TVal> | IUnbox<TVal[]>
  ): BoxedGenerator<TVal> {
    return BoxedGenerator.of<TVal>(boxedList.unbox());
  }

  // protected ================================-| constructor() |-====
  protected constructor(valueGenerator: () => Generator<T>) {
    this.#valueGenerator = valueGenerator;
  }
  // public ===========================================-| map() |-====
  public mapIndex: number = 0;
  public map<TMap>(
    fn: Mapper<T, TMap>
    // delay: undefined | null | number | boolean = false
  ): BoxedGenerator<TMap> {
    const generator = this.#valueGenerator;
    const that = this;
    function* arrayGenerator(): Generator<TMap> {
      for (const item of generator()) yield fn(item, that.mapIndex++);
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ====================================-| awaitedMap() |-====
  public awaitedMapIndex: number = 0;
  public awaitedMap<TMap>(
    fn: Mapper<Awaited<T>, Promise<TMap>>
  ): BoxedGenerator<Promise<TMap>> {
    const generator = this.#valueGenerator;
    const that = this;
    function* arrayGenerator(): Generator<Promise<TMap>> {
      for (const item of generator()) {
        yield (async () => fn(await item, that.mapIndex++))();
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public =======================================-| thenMap() |-====
  public thenMap<TMap1, TMap2 = never>(
    onfulfilled?: ThenMapper<T, TMap1> | null,
    onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<TMap1 | TMap2>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<TMap1 | TMap2>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.then(onfulfilled, onrejected);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ======================================-| catchMap() |-====
  public catchMap<TMap2 = never>(
    onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<T | TMap2>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<T | TMap2>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.catch(onrejected); // .then(onfulfilled, onrejected);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ====================================-| finallyMap() |-====
  public finallyMap(
    onfinally: (() => void) | null // ThenMapper<T, TMap1> | null,
    // onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<T>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<T>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.finally(onfinally);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }
  // public =========================================-| unbox() |-====
  public unbox(): T[] {
    return [...this.#valueGenerator()];
  }

  // public =========================================-| spark() |-====
  public spark() {
    return BoxedGenerator.of(...this.unbox());
  }

  // public ====================================-| sparkAsync() |-====
  public async asyncSpark() {
    const result = Promise.all(this.unbox().map(i => immediateZalgo(i)));
    return BoxedGenerator.of(...(await result));
  }

  // get ==============================================-| box() |-====
  get box() {
    return Box.of(this.unbox());
  }

  // get ===========================================-| length() |-====
  get length() {
    return this.unbox().length;
  }
  // get ==========================================-| boxedList |-====
  public get boxedList(): BoxedList<T> {
    return BoxedList.of<T>(...this.unbox());
  }

  // get =============================================-| values |-====
  public get values(): T[] {
    return this.unbox();
  }

  // get ================================================-| gen |-====
  public get gen(): () => Generator<T> {
    return this.#valueGenerator;
  }
}

// async function main(): Promise<void> {
//   BoxedGenerator.of([1, 2, 3, 4])
//     .map(e => timeoutZalgo(2000, e * 2))
//     .map(async e => console.log(`${await e}`)).values;

//   return void 42;
// }
// void main;
// main();

export class PseudoCode<T> {
  public static of<TVal>(...values: TVal[] | [TVal[]]): PseudoCode<TVal> {
    if (values.length === 1) {
      const list = values[0];
      return Array.isArray(list)
        ? new PseudoCode<TVal>(list)
        : new PseudoCode<TVal>([list]); /* as PseudoCode<TVal>; */
    } else {
      // values.length !== 1
      // PseudoCode.of(1, 2, 3);
      const list = [...values];
      return PseudoCode.of<TVal>(
        list as any as TVal
      ); /* as PseudoCode<TVal>; */
      // return null;
    }
  }

  public value: T[];

  constructor(value: T[]) {
    this.value = value;
  }
}

const pseudoCode1 = PseudoCode.of([1, 2, 3]);
const pseudoCode2 = PseudoCode.of(1);
const pseudoCode3 = PseudoCode.of(1, 2, 3);
const pseudoCode4 = PseudoCode.of([1, 2, 3], [1, 2, 3]);
const pseudoCode5 = PseudoCode.of([
  [1, 2, 3],
  [1, 2, 3],
]);

pseudoCode1;
pseudoCode2;
pseudoCode3;
pseudoCode4;
pseudoCode5;
// 1,

// 1,2,3 --> [1,2,3] (*inside my of function)
// [1,2,3]

// [1,2,3][4,5,6]
// [[1,2,3][4,5,6]]
