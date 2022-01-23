import { Box, BoxedList } from '.';
import { Mapper } from '../..';
import { IUnbox, IUnboxList } from '../types';
const DEBUG = false;
let count1 = 0;
let count3 = 0;
if (DEBUG) console.error('DEBUG = true in:', __filename);
export class BoxedGenerator<T> implements IUnboxList<T>, IUnbox<T[]> {
  #valueGenerator: () => Generator<T>;
  // static ==============================================-| of() |-====
  count2 = 0;
  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
    const arrayGenerator = (array: TVal[]): (() => Generator<TVal>) =>
      function* (): Generator<TVal> {
        for (let index = 0; index < array.length; index++) {
          const currentValue = array[index];
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

  // static =========================================-| fromGen() |-====
  public static fromGen<TVal>(
    generatorFn: () => Generator<TVal>
  ): BoxedGenerator<TVal> {
    return new BoxedGenerator<TVal>(generatorFn);
  }

  // static ============================================-| from() |-====
  public static from<TVal>(
    boxedList: IUnboxList<TVal> | IUnbox<TVal[]>
  ): BoxedGenerator<TVal> {
    return BoxedGenerator.of<TVal>(boxedList.unbox());
  }

  // protected ==================================-| constructor() |-====
  protected constructor(valueGenerator: () => Generator<T>) {
    this.#valueGenerator = valueGenerator;
  }
  // public =============================================-| map() |-====
  public map<TMap>(
    fn: Mapper<T, TMap>
    // delay: undefined | null | number | boolean = false
  ): BoxedGenerator<TMap> {
    const generator = this.#valueGenerator;
    // delay;
    const _that = this;
    // let zalgo = <T>(id: T) => id;
    // if (delay === null) zalgo = <T>(id: T) => id;
    // if (delay != null && delay <= 0) zalgo = <T>(id: T) => id;
    // if (delay != null && delay > 0) zalgo = <T>(id: T) => id;
    // if (delay != null && delay === true) zalgo = <T>(id: T) => id;
    // if (delay != null && delay === false) zalgo = <T>(id: T) => id;

    // zalgo;
    // BUG:
    if (DEBUG) {
      console.log('outside of generator', ++count1);
    }

    function* arrayGenerator(): Generator<TMap> {
      for (const item of generator()) {
        // BUG:
        if (DEBUG) {
          console.log(
            'inside of generator',
            count1,
            ++_that.count2,
            ++count3 - count1 - _that.count2
          );
        }
        yield fn(item);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }
  // public ===========================================-| unbox() |-====
  public unbox(): T[] {
    return Array.from(this.#valueGenerator());
  }

  // public ===========================================-| spark() |-====
  public spark() {
    return BoxedGenerator.of(...this.unbox());
  }

  // get ================================================-| box() |-====
  get box() {
    return Box.of(this.unbox());
  }

  // get =============================================-| length() |-====
  get length() {
    return this.unbox().length;
  }
  // get ============================================-| boxedList |-====
  public get boxedList(): BoxedList<T> {
    return BoxedList.of<T>(...this.unbox());
  }

  // get ===============================================-| values |-====
  public get values(): T[] {
    return this.unbox();
  }

  // get ==================================================-| gen |-====
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
