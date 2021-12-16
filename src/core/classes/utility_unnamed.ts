// export const genItems =
//   a =>
//   b =>
//   list =>
//   (delay = 1) =>
//   mapFn => ({
//     from: a,
//     to: b,
//     async *[Symbol.asyncIterator]() {
//       for (const value of list) {
//         await new Promise(resolve => setTimeout(resolve, delay));
//         yield mapFn(value);
//       }
//     },
//   });

var delay_ = 10; // from: 1,
// to: 0,
export const someName = {
  async *[Symbol.asyncIterator]() {
    // for (const value of list) {
    await new Promise(resolve => setTimeout(resolve, delay_));

    // yield mapFn(value);
    // }
  },
};

export const genPageUrls =
  pageUrlFn =>
  (delay = 1) =>
  ([userName, userID]) =>
  (b, a = 1) => ({
    from: a,
    to: b,
    async *[Symbol.asyncIterator]() {
      // called once, in the beginning of for..of,
      for (let value = this.from; value <= this.to; value++) {
        // make a pause between values, wait for something
        await new Promise(resolve => setTimeout(resolve, delay));
        yield pageUrlFn([userName, userID])(value);
      }
    },
  });
