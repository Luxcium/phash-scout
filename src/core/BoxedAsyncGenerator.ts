import type { Mapper } from '..';
import { timeoutZalgo } from '../utils';

export class BoxedAsyncGenerator<T> {
  #valueAsyncGenerator: () => AsyncGenerator<T>;

  public static from = <TVal>(
    generatorFn: () => AsyncGenerator<TVal>
  ): BoxedAsyncGenerator<TVal> => {
    return new BoxedAsyncGenerator<TVal>(generatorFn);
  };
  public static of = <TVal>(
    ...values: TVal[] | [TVal[]]
  ): BoxedAsyncGenerator<TVal> => {
    const arrayGenerator = (array: TVal[]): (() => AsyncGenerator<TVal>) =>
      async function* (): AsyncGenerator<TVal> {
        for (let index = 0; index < array.length; index++) {
          const currentValue = array[index];
          yield currentValue;
        }
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

  protected constructor(valueGenerator: () => AsyncGenerator<T>) {
    this.#valueAsyncGenerator = valueGenerator;
  }
  public mapAwait<TMap>(fn: Mapper<T, TMap>): BoxedAsyncGenerator<TMap> {
    const asyncGenerator = this.#valueAsyncGenerator;
    async function* arrayAsyncGenerator(): AsyncGenerator<TMap> {
      for await (const item of asyncGenerator()) {
        yield fn(item);
      }
    }
    return BoxedAsyncGenerator.from(arrayAsyncGenerator);
  }
  // public unbox() /* : Promise<T[]> */ {
  //   // // (await this.#valueGenerator)()
  //   // const valGen = this.#valueAsyncGenerator;
  //   // const something =  valGen();
  //   // void valGen, [... something], something;
  //   // // something.return('')
  //   // return something; //Array.from([1, 1, 1]);
  //   const asyncGenerator = this.#valueAsyncGenerator;

  //   function* arrayGenerator(): Generator<any> {
  //     yield asyncGenerator().next();
  //     //  yield (async()=>{for await (const item of asyncGenerator()) {
  //     //      fn(item);
  //     //   }})
  //   }
  //   return Array.from(arrayGenerator());
  public get asyncGen(): () => AsyncGenerator<T> {
    return this.#valueAsyncGenerator;
  }

  public unboxAsyncGen() {
    return this.asyncGen();
  }
}

async function main(): Promise<void> {
  const asyncGen = BoxedAsyncGenerator.of([1, 2, 3, 4])
    .mapAwait(e => timeoutZalgo(2000, e * 2))
    .mapAwait<number>(e => e * 2)
    // .map(e => `${e}`)
    .asyncGen();
  for await (const item of asyncGen) {
    console.log(item);
  }

  return void 42;
}
void main;
main();
