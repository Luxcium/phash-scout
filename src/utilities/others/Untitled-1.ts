// export type Either<L,R> = L|R

/**
 * @category model
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left';
  readonly left: E;
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right';
  readonly right: A;
}

/**
 * @category model
 * @since 2.0.0
 */
export type Either<E, A> = Left<E> | Right<A>;

export const either: Either<any, number> = { right: 3, _tag: 'Right' };

interface PromiseFulfilledResult<T> {
  readonly _tag: 'Right';
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  readonly _tag: 'Left';
  status: 'rejected';
  reason: any;
}

export type PromiseSettledResult<T> =
  | PromiseRejectedResult
  | PromiseFulfilledResult<T>;
