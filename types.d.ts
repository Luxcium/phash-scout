type Mapper = <T,U>(value: T, index: number, array: readonly T[]) => U;
declare async function capParallel<T,U>(arr:T[], mapFn:Mapper<T,U>, limit:number = arr.length):Promise<U[]>
