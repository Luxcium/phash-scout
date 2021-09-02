This is the code from a [blog post](https://medium.com/@alexewerlof/async-map-with-limited-parallelism-in-node-js-2b91bd47af70)

`IO_Map<T, U>(list: T[], mapFn: Mapper<T, U>, limit?: number): Promise<U[]>`

    CPU_Map(filename: string) => <T, R>(list: T[], mapFn:  Mapper<T, R>, limit?: number): {
        mapper: () => Promise<R[]>;
        thread: () => void;
    }
