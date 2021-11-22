import { IO_Mapper } from '.';
import { Mapper } from '..';
import { immediateZalgo } from '../utils';

class Box<T> {
  #value: T[];
  // private value: T[];
  #limit: number;

  // static ==============================================-| of() |-====
  public static of = <TVal>(...values: TVal[] | [TVal[]]): Box<TVal> => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) {
        return new Box<TVal>([...value]);
      }
    }
    return new Box<TVal>([...(values as TVal[])]);
  };

  private constructor(value: T[], limit: number = 1) {
    this.#limit = limit;
    this.#value = [...value];
  }
  public *yield<R>(mapFn: Mapper<T, R>) {
    for (const value of this.#value) {
      yield mapFn(value);
    }
  }

  public async *yieldAsync<R>(mapFn: Mapper<T, R>) {
    for (const value of this.#value) {
      console.log(value);
      yield immediateZalgo(mapFn(value));
    }
  }
  public async ioMapper<R>(mapFn: Mapper<T, R>, limit: number = this.#limit) {
    const list = this.#value;
    this.#limit = limit;
    const results = await IO_Mapper({ list, mapFn, limit });
    const fulfilled = results
      .filter(item => item.status === 'fulfilled')
      .map((item: any) => item.value as R);
    const rejected = results
      .filter(item => item.status === 'rejected')
      .map((item: any) => item.reason);
    const fulfilledIndex = results.map((item: any) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
      return Symbol.for('rejected');
    });

    const rejectedIndex = results.map((item: any) => {
      if (item.status === 'rejected') {
        return item.reason;
      }
      return Symbol.for('fulfilled');
    });

    return {
      results: {
        all: Box.of<PromiseSettledResult<R>>(results),
        fulfilled: Box.of<R>(fulfilled),
        rejected: Box.of<any>(rejected),
      },
      fulfilled:
        fulfilled.length === 0
          ? null
          : { values: fulfilled, length: fulfilled.length },
      rejected:
        rejected.length === 0
          ? null
          : { reasons: rejected, length: rejected.length },
      fulfilledIndex,
      rejectedIndex,
      length: results.length,
    };
  }
  public map<R>(callbackfn: Mapper<T, R>) {
    return Box.of(this.#value.map(callbackfn));
  }

  public mapAsync<R>(callbackfn: Mapper<T, R>) {
    return Box.of(
      this.#value.map(async tVal => immediateZalgo(callbackfn(tVal)))
    );
  }
  public unbox() {
    return [...this.#value];
  }

  public get value() {
    return this.unbox();
  }
  async unboxAsync() {
    return [
      ...(await Promise.all(
        this.#value.map(async tVal => immediateZalgo(tVal))
      )),
    ];
  }
  get length() {
    return this.#value.length;
  }

  // get fulfilled() {
  // // return this.#value.filter(value=>value?.status === 'fulfilled');
  // // 'return', 'this','#value','filter','(value=>value?','status', '===', 'fulfilled');
  // }

  //     get rejected() {
  //   return this.#value.length;
  // }
}

export default Box;

async function main() {
  const myVal = [
    'return',
    'this',
    '#value?',
    'filter',
    '(value=>value?',
    'status',
    '===',
    'fulfilled!',
  ];

  const myFn = (x: any) => {
    const result: number = x.length;

    if (result % 2) {
      throw new Error();
    }
    return result;
  };
  const myBox001 = Box.of(myVal);
  console.log('myBox001:', myBox001.unbox());
  console.log(await myBox001.ioMapper(myFn));
  console.log(myBox001.yield(x => x.length));
  // return [...myBox001.yield(x => x.length)];
  // console.log(Symbol.for('fulfilled') === Symbol.for('fulfilled'));
}
main();

/*
  Result<T, E>
  enum Option<T> {
    None,
    Some(T),
}
    */

// export class Result<T, E> {
//   private value: T;
//   private reason: E;

//   constructor(reason: E, value: T) {
//     this.reason = reason;
//     this.value = value;
//   }
// }

export type Option<T1, T2> = Some<T1> | None<T2>;

class None<T> {
  public static of<TVal>(val?: TVal) {
    return new None(val);
  }

  private _value: T | undefined;

  public constructor(val?: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    if (this._value !== undefined) {
      return new None<TMap>(fn(this._value));
    } else {
      return new None<TMap>(this._value as any);
    }
  }
}

class Some<T> {
  public static of<TVal>(val: TVal) {
    return new Some(val);
  }

  private _value: T;

  public constructor(val: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Some<TMap>(fn(this._value));
  }
}

export class Result<T> {
  public static of<TVal>(val?: TVal) {
    return new Result(val);
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
    if (this.isNothing()) {
      return new Result<TMap>();
    } else {
      return new Result<TMap>(fn(this._value));
    }
  }

  public ap<TMap>(c: Result<(val: T) => TMap>) {
    return c.map(fn => this.map(fn));
  }
}

// export class Ok<T, E> {
//   private value: T;
//   private reason: E;

//   constructor(reason: E, value: T) {
//     this.reason = reason;
//     this.value = value;
//   }
// }

// export class Err<T, E> {
//   private value: T;
//   private reason: E;

//   constructor(reason: E, value: T) {
//     this.reason = reason;
//     this.value = value;
//   }
// }

/*
  Result<T, E>
  enum Option<T> {
    None,
    Some(T),
}
    */

export class SimpleBox<T> {
  #value: T[];
  private values: T[];

  // static ==============================================-| of() |-====
  public static of = <TVal>(...values: TVal[] | [TVal[]]): SimpleBox<TVal> => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) {
        return new SimpleBox<TVal>([...value]);
      }
    }
    return new SimpleBox<TVal>([...(values as TVal[])]);
  };

  private constructor(value: T[]) {
    this.#value = [...value];
    this.values = [...this.#value];
  }

  public map<TMap>(fn: Mapper<T, TMap>): SimpleBox<TMap> {
    return SimpleBox.of<TMap>(this.#value.map(fn));
  }

  public mapAsync<R>(callbackfn: Mapper<T, R>) {
    return SimpleBox.of(
      this.#value.map(async tVal => immediateZalgo(callbackfn(tVal)))
    );
  }
  public unbox() {
    return this.values;
  }

  public get value() {
    return this.unbox();
  }
  async unboxAsync() {
    return [
      ...(await Promise.all(
        this.#value.map(async tVal => immediateZalgo(tVal))
      )),
    ];
  }

  public get asyncValue() {
    return this.unboxAsync();
  }
  get length() {
    return this.#value.length;
  }

  // get fulfilled() {
  // // return this.#value.filter(value=>value?.status === 'fulfilled');
  // // 'return', 'this','#value','filter','(value=>value?','status', '===', 'fulfilled');
  // }

  //     get rejected() {
  //   return this.#value.length;
  // }
}

export function ap<TMap>(self: any, c: SimpleBox<(val: any) => unknown>) {
  const cList = c.value;
  const tList = self.value;
  void cList, tList;
  //@ts-ignore
  const cList_ = [x => x + x, x => x + 2, x => x * x];
  const tList_ = [1, 2, 3, 4, 5, 6, 7];
  void cList_, tList_;

  function tListMapper /* <TVal, RVal> */(
    item: any,
    cItems: any //((val: any) => any)[]
  ): TMap {
    if (cItems.length > 1) {
      const itemList = cItems.slice();
      const head = itemList.shift();
      if (head) {
        return tListMapper(/* <any, unknown> */ head(item), itemList);
      }
      throw Error('NEVER');
    }
    return item;
  }
  void tListMapper;
  tList_.map(item => {
    return item;
  });
  return c.map(fn => self.map(fn));
}

export class BasicBox<T> {
  #value: T;

  static of<TVal>(value: TVal): BasicBox<TVal> {
    return new BasicBox(value);
  }

  protected constructor(value: T) {
    this.#value = value;
  }

  public map<TMap>(fn: Mapper<T, TMap>): BasicBox<TMap> {
    return BasicBox.of<TMap>(fn(this.#value));
  }
  public unbox() {
    return this.#value;
  }
}

export class BoxedList<T> {
  #values: T[];

  public static of = <TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> => {
    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedList<TVal>([...list]);
      }
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  };

  protected constructor(values: T[]) {
    this.#values = values;
  }
  public map<TMap>(fn: Mapper<T, TMap>): BoxedList<TMap> {
    return BoxedList.of<TMap>(this.#values.map(fn));
  }
  public unbox(): T[] {
    return this.#values;
  }

  public unboxGenerator() {
    const array = this.#values;
    return function* arrayGenerator(): Generator<[T, number, T[]]> {
      for (let index = 0; index < array.length; index++) {
        const currentValue = array[index];
        yield [currentValue, index, array];
      }
    };
  }
  public get value(): T[] {
    return this.unbox();
  }

  public asyncMap<R>(asyncFn: Mapper<T, R>) {
    return BoxedList.of(
      this.#values.map(async item =>
        immediateZalgo(asyncFn(await immediateZalgo(item)))
      )
    );
  }
  async asyncUnbox() {
    const values = await immediateZalgo(this.#values);
    return Promise.allSettled(values.map(async tVal => immediateZalgo(tVal)));
  }

  public get asyncValue() {
    return this.asyncUnbox();
  }
  get length(): number {
    return this.#values.length;
  }

  public ioMapper<R>(mapFn: Mapper<T, R>, limit: number = 1) {
    const list = this.#values;
    return BoxedList.of(IO_Mapper({ list, mapFn, limit }));
    // const results = await
  }
}

export class BoxedGenerator<T> {
  // #values: T[];
  #valueGenerator: () => Generator<T>;

  public static from = <TVal>(generatorFn: () => Generator<TVal>) => {
    return new BoxedGenerator<TVal>(generatorFn);
  };
  public static of = <TVal>(
    ...values: TVal[] | [TVal[]]
  ): BoxedGenerator<TVal> => {
    const arrayGenerator = (array: TVal[]) =>
      function* (): Generator<TVal> {
        for (let index = 0; index < array.length; index++) {
          const currentValue = array[index];
          yield currentValue;
        }
      };
    void arrayGenerator;

    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedGenerator<TVal>(arrayGenerator([...list]));
      }
    }

    return new BoxedGenerator<TVal>(arrayGenerator([...(values as TVal[])]));
  };

  protected constructor(valueGenerator: () => Generator<T>) {
    this.#valueGenerator = valueGenerator;
    void this.#valueGenerator;
    // this.#values = values;
    // const array = values;
    //   = function* arrayGenerator(): Generator<
    //   [T, number, T[]]
    // > {
    //   for (let index = 0; index < array.length; index++) {
    //     const currentValue = array[index];
    //     yield [currentValue, index, array];
    //   }
    // };
  }
  public map<TMap>(fn: Mapper<T, TMap>) {
    const generator = this.#valueGenerator;
    function* arrayGenerator(): Generator<TMap> {
      for (const item of generator()) {
        yield fn(item);
      }
    }
    return BoxedGenerator.from(arrayGenerator);
  }
  public unbox() {
    return this.#valueGenerator;
  }

  // public unboxGenerator() {
  //   const array = this.#values;
  //   return function* arrayGenerator(): Generator<[T, number, T[]]> {
  //     for (let index = 0; index < array.length; index++) {
  //       const currentValue = array[index];
  //       yield [currentValue, index, array];
  //     }
  //   };
  // }
  public get value() {
    return this.unbox();
  }

  // public asyncMap<R>(asyncFn: Mapper<T, R>) {
  //   return BoxedList.of(
  //     this.#values.map(async item =>
  //       immediateZalgo(asyncFn(await immediateZalgo(item)))
  //     )
  //   );
  // }
  // async asyncUnbox() {
  //   const values = await immediateZalgo(this.#values);
  //   return Promise.allSettled(values.map(async tVal => immediateZalgo(tVal)));
  // }

  // public get asyncValue() {
  //   return this.asyncUnbox();
  // }
  // get length(): number {
  //   return this.#values.length;
  // }

  // public ioMapper<R>(mapFn: Mapper<T, R>, limit: number = 1) {
  //   const list = this.#values;
  //   return BoxedList.of(IO_Mapper({ list, mapFn, limit }));
  //   // const results = await
  // }
}

/*

const someArray = [1,2,3,4];

function* timesTwo(i: Iterable<number>) {
    for(const e of i) {
        yield e * 2;
    }
}

function *stringify(i: Iterable<unknown>) {
    for(const e of i) {
        yield `${e}`;
    }
}

console.log(Array.from(stringify(timesTwo(someArray))));

export function* arrayGenerator<T>(array: T[]): Generator<[T, number, T[]]> {
  // ++----- arrayGenerator -------------------------------------------+
  //
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    yield [currentValue, index, array];
  }
 const fulfilled = results
      .filter(item => item.status === 'fulfilled')
      .map((item: any) => item.value as R);
    const rejected = results
      .filter(item => item.status === 'rejected')
      .map((item: any) => item.reason);
    const fulfilledIndex = results.map((item: any) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
      return Symbol.for('rejected');
    });

    const rejectedIndex = results.map((item: any) => {
      if (item.status === 'rejected') {
        return item.reason;
      }
      return Symbol.for('fulfilled');
    });

    return {
      results: {
        all: Box.of<PromiseSettledResult<R>>(results),
        fulfilled: Box.of<R>(fulfilled),
        rejected: Box.of<any>(rejected),
      },
      fulfilled:
        fulfilled.length === 0
          ? null
          : { values: fulfilled, length: fulfilled.length },
      rejected:
        rejected.length === 0
          ? null
          : { reasons: rejected, length: rejected.length },
      fulfilledIndex,
      rejectedIndex,
      length: results.length,
    };


    Chain
A value that implements the Chain specification must also implement the Apply specification.

m['fantasy-land/chain'](f)['fantasy-land/chain'](g) is equivalent to m['fantasy-land/chain'](x => f(x)['fantasy-land/chain'](g)) (associativity)

fantasy-land/chain method
fantasy-land/chain :: Chain m => m a ~> (a -> m b) -> m b
A value which has a Chain must provide a fantasy-land/chain method. The fantasy-land/chain method takes one argument:

m['fantasy-land/chain'](f)
f must be a function which returns a value

If f is not a function, the behaviour of fantasy-land/chain is unspecified.
f must return a value of the same Chain
fantasy-land/chain must return a value of the same Chain
    */

export type Either<T1, T2> = Just<T1> | Nothing<T2>;

class Nothing<T> {
  public static of<TVal>(val?: TVal) {
    return new Nothing(val);
  }

  #value: T | undefined;

  public constructor(val?: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    if (this.#value !== undefined) {
      return new Nothing<TMap>(fn(this.#value));
    } else {
      return new Nothing<TMap>(this.#value as any);
    }
  }
}

class Just<T> {
  public static of<TVal>(val: TVal) {
    return new Just(val);
  }

  #value: T;

  public constructor(val: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Just<TMap>(fn(this.#value));
  }
}
