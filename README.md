# @luxcium/parallel-mapping v0.0.0-rc-0.0.2

Development phase no tests, no documentation, full TypeScript support parallele IO and Worker Threads mapping support with limits of concurent tasks.

## Installation

Using npm:

```bash
  $ npm install -g npm@latest
  $ npm install --save @luxcium/parallel-mapping
```

Using yarn:

```bash
  $ yarn add @luxcium/parallel-mapping
```

## API

### IO_Mapper

<!--
#### Signature

```typescript
type Mapper<A, B> = (value: A, index?: number, array?: readonly A[]) => B;

function CPU_Mapper(filename: string): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number
) => {
  mapper: () => Promise<PromiseSettledResult<R>[]>;
  thread: () => void;
};
```

The `CPU_Mapper` function consume first a _filename_ `string` (the `filename` argument is descibe below) and return a function which takes 3 arguments:

- `list: T[]`, A list: an array of element all of the same type `T`.
- `mapFn: Mapper<T, R>`, A mapping function: a function of type `Mapper<A, B>` used as a mapper which apply a tranformation from the input type `T` to the output of type `R` over each element of the list.
- `limit?: number` A limit (optional): a number representing the maximum cocurent workers used to splitt the workload of mapping over each element of the list. If the value is not provided the `os.cpus().length` is used instead but will be limited to the length of the list with `Math.min(limit, list.length)`.

The `filename` argument is passed to the Worker constructor as is and therefor must be compatible whit the argument of the same name described in nodeJs documentation:

- filename `<string>` | `<URL>` The path to the Worker's main script or module. Must be either an absolute path or a relative path (i.e. relative to the current working directory) starting with ./ or ../, or a WHATWG URL object using file: or data: protocol. When using a data: URL, the data is interpreted based on MIME type using the ECMAScript module loader.

There is a caveat that is, the `filename` parameter canot be a string containing JavaScript code rather than a path. It must point to where the _CPU Mapper_ will be consumed. For more infomarion take a look at the examples below.
-->

### CPU_Mapper

A straight forward approch is used so that you can have similar APIs regardles if you are using the CPU_Mapper flavour or the IO_Mapper flavour

The **CPU Mapper API** is a wrapper for _'worker threads'_ using the [NodeJS Worker class (_added in: NodeJS v10.5.0_)](https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_class_worker)

#### Signatures

```typescript
function CPU_Mapper(
  filename: string
): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number
) => CPU_MapperRetunType<R>;
```

The `CPU_Mapper` function consume first a _filename_ `string` (the `filename` argument is descibe below) and return a function which takes 3 arguments:

- `list: T[]`, A list: an array of element all of the same type `T`.
- `mapFn: Mapper<T, R>`, A mapping function: a function of type `Mapper<A, B>` used as a mapper which apply a tranformation from the input type `T` to the output of type `R` over each element of the list.
- `limit?: number` A limit (optional): a number representing the maximum cocurent workers used to splitt the workload of mapping over each element of the list. If the value is not provided the `os.cpus().length` is used instead but will be limited to the length of the list with `Math.min(limit, list.length)`.
  _or_

```typescript
function CPU_Mapper(
  filename: string
): <T, R>(cpuMapperArgs: CPU_MapperArgs<T, R>) => CPU_MapperRetunType<R>;
```

> All 3 parameter can be combined into a single argument as an object with values of same name and similar type `{list, mapFn, limit}`. The argument object type is `CPU_MapperArgs<TVal, RVal>`. In such case the 2nd and 3rd argument can be passed as _empty_, `null` or `undefined`.

#### Types

```typescript
type Mapper<A, B> = (value: A, index?: number, array?: readonly A[]) => B;
```

```typescript
type CPU_MapperArgs<TVal, RVal> = {
  list: T[];
  mapFn: Mapper<TVal, RVal>;
  limit?: number;
};
```

```typescript
type CPU_MapperRetunType<U> = {
  mapper: () => Promise<PromiseSettledResult<U>[]>;
  thread: () => void;
};
```

The `filename` argument is passed to the Worker constructor as is and therefor must be compatible whit the argument of the same name described in nodeJs documentation:

- filename `<string>` | `<URL>` The path to the Worker's main script or module. Must be either an absolute path or a relative path (i.e. relative to the current working directory) starting with ./ or ../, or a WHATWG URL object using file: or data: protocol. When using a data: URL, the data is interpreted based on MIME type using the ECMAScript module loader.

There is a caveat that is, the `filename` parameter canot be a string containing JavaScript code rather than a path. It must point to where the _CPU Mapper_ will be consumed. For more infomarion take a look at the examples below.

---

## DOCUMENTATION INCOMPLE ― WORK IN PROGRESS

### MIT Style Liscense

#### Copyright &copy; 2021 Benjamin Vincent Kasapoglu (Luxcium)

based on work by Alex Ewerlöf described in his _Async Map With Limited Parallelism In Node Js_ [blog post](https://medium.com/@alexewerlof/async-map-with-limited-parallelism-in-node-js-2b91bd47af70) on Medium. (Copyright © 2020-2021 Alex Ewerlöf)

<!--
```
(alias) function CPU_Mapper(filename: string): <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number | undefined) => {
    mapper: () => Promise<PromiseSettledResult<R>[]>;
    thread: () => void;
}
export CPU_Mapper
The path to the Worker's main script or module.

(alias) function IO_Mapper<T, U>({ list, mapFn, limit, }: IO_MapperArgs<T, U>): Promise<PromiseSettledResult<U>[]>
export IO_Mapper
```

This is the code from a [blog post](https://medium.com/@alexewerlof/async-map-with-limited-parallelism-in-node-js-2b91bd47af70)

 -->
