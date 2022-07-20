/** Used to average out times in a timer list */

export function averageReducer(times: number[], max = 20_000) {
  times.push(performance.now());
  let len = times.length;
  while (len > max) {
    times.shift();
    len = times.length;
  }

  const halfLen = Math.floor(len / 2);
  const roundLen = halfLen - (halfLen % 2);
  const times1 = times.slice(0, roundLen);
  const times2 = times.slice(-roundLen);

  return (
    times1.reduce((p, c, i) => {
      return p + (times2[i] - c) / times1.length;
    }, 0) / times1.length || 0
  );
}
