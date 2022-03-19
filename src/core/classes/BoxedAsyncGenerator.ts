import type { IUnbox, IUnboxList, Mapper } from '../..';
import { timeoutZalgo } from '../../utilities/utils';
import { immediateZalgo } from '../utils';

/** Create a container to hold a value as an AsyncGenerator on wich you could map */
export class BoxedAsyncGenerator<T> {
  #valueAsyncGenerator: () => AsyncGenerator<T>;

  public static fromGen = <TVal>(
    generatorFn: () => AsyncGenerator<TVal>
  ): BoxedAsyncGenerator<TVal> => {
    return new BoxedAsyncGenerator<TVal>(generatorFn);
  };

  // static ==========================================-| from() |-====
  public static from<TVal>(
    boxedList: IUnboxList<TVal> | IUnbox<TVal[]>
  ): BoxedAsyncGenerator<TVal> {
    return BoxedAsyncGenerator.of<TVal>(boxedList.unbox());
  }
  // static ============================================-| of() |-====
  public static of = <TVal>(
    ...values: TVal[] | TVal[][]
  ): BoxedAsyncGenerator<TVal> => {
    const arrayGenerator = (array: TVal[]): (() => AsyncGenerator<TVal>) =>
      async function* (): AsyncGenerator<TVal> {
        const array_ = array.map(i => immediateZalgo(i));
        for await (const iterator of array_) yield iterator;
      };

    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedAsyncGenerator<TVal>(arrayGenerator([...list]));
      }
    }

    return new BoxedAsyncGenerator<TVal>(
      arrayGenerator([...(values as TVal[])])
    );
  };

  // constructor ======================-| BoxedAsyncGenerator() |-====
  protected constructor(valueGenerator: () => AsyncGenerator<T>) {
    this.#valueAsyncGenerator = valueGenerator;
  }
  public mapAwait<R>(
    fn: Mapper<T, Promise<R> | R>,
    delay: number = 0
  ): BoxedAsyncGenerator<Awaited<R>> {
    const asyncGenerator = this.#valueAsyncGenerator;
    async function* asyncGeneratorFn(): AsyncGenerator<Awaited<R>> {
      let index = 0;

      for await (const item of asyncGenerator()) {
        if (delay === 0) {
          await new Promise(resolve => setImmediate(resolve));
          yield fn(item, index++);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        yield fn(item, index++);
      }
    }
    return BoxedAsyncGenerator.fromGen(asyncGeneratorFn);
  }

  public get asyncGen(): () => AsyncGenerator<T> {
    return this.#valueAsyncGenerator;
  }

  public unboxAsyncGen(): AsyncGenerator<T> {
    return this.asyncGen();
  }
}

void main;
// main();
async function main(): Promise<void> {
  const box = BoxedAsyncGenerator.of([1, 2, 3, 4]);
  const asyncGen1 = box
    .mapAwait<Promise<number>>(item => timeoutZalgo(2000, item * 2))
    .asyncGen();
  const asyncGen2 = box.mapAwait<number>(item => item * 2).asyncGen();

  const asyncGen = BoxedAsyncGenerator.of([1, 2, 3, 4])
    .mapAwait<Promise<number>>(item => timeoutZalgo(2000, item * 2))
    .mapAwait<number>(item => item * 2)
    // .map(item => `${item}`)
    .asyncGen();
  for await (const item of asyncGen) console.log(item);

  for await (const item of asyncGen1) console.log(item);

  for await (const item of asyncGen2) console.log(item);

  return void 42;
}
