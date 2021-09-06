/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
/*  Based on work from @userpixel (https://github.com/userpixel)      */
/*  Copyright (c) 2020-2021 Alex Ewerlöf                              */
/*--------------------------------------------------------------------*/
export function* arrayGenerator<T>(
  array: T[],
  count: any
): Generator<[T, number, T[]]> {
  if (count) console.log('OUTSIDE GENERATOR LOOP:', count.B++);

  for (let index = 0; index < array.length; index++) {
    if (count) console.log('INSIDE GENERATOR LOOP:', count.C++);

    const currentValue = array[index];
    yield [currentValue, index, array];
  }
}
