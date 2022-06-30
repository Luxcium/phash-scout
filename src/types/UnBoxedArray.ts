export type UnBoxedArray<A> = A extends Array<infer E> ? E : A;
