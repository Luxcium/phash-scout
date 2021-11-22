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

export type Either<T1, T2> = Just<T1> | Nothing<T2>;
export type PromiseSettledEither<T> = Either<T, any>;

export function promiseSettledEither<T>(
  promiseSettledResult: PromiseSettledResult<T>
): PromiseSettledEither<T> {
  if (promiseSettledResult.status === 'fulfilled')
    return Just.of(promiseSettledResult.value);
  if (promiseSettledResult.status === 'rejected')
    return Nothing.of(promiseSettledResult.reason);
  throw new Error('NEVER');
}

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

export interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>;

  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T>(
    values: Iterable<T | PromiseLike<T>>
  ): Promise<PromiseSettledResult<Awaited<T>>[]>;
}

/*
an array called list denoted by []
a boxing type with function of and from
a boxing type with function map
a boxing type with a function named unbox or a property named value
a boxing type with a chain function map then unbox
a box of function passed to an apply function

 */

export interface IBox<T> {
  // static of

  // static from
  value: T;
  map: <R>(val: T) => IBox<R>;
  unbox: T;
  chain: <R>(val: T) => R;
  apply: any;
}

export type TBoxedList<T> = IBox<T[]>;
