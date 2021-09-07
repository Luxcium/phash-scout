#!/usr/bin/env node
// !!timer-blockout-example.js

const { promisify } = require('util');

// const immediateZalgo = (value, options) =>
//   promisify(setTimeout)(0, value, options);

const immediateZalgo = (value, options) =>
  promisify(setImmediate)(value, options);

const timeoutZalgo = (delay, value, options) =>
  promisify(setTimeout)(delay, value, options);

async function nextTickZalgo(value) {
  await promisify(process.nextTick)();
  return value;
}

// const zalgo = value => timeoutZalgo(0, value);
const zalgo = value => immediateZalgo(value);
// const zalgo = value => nextTickZalgo(value);
// const zalgo = value => value;

const watch = require(__dirname + '/processor-usage.js'); //;

var shouldRun = true;

async function blockCpu() {
  var result = 0;
  var count = 1;
  var returnValue = 0;
  let run = true;
  while (run) {
    run = shouldRun;
    returnValue = await zalgo((result += Math.random() * Math.random()));
    // returnValue = await immediateZalgo(
    //   (result += Math.random() * Math.random())
    // );
    // returnValue = result += Math.random() * Math.random();
    count++;
    var usage = global.processCpuUsage;
    console.log(count, usage ? `― ${usage}% ` : '― ?%');
  }
  return returnValue;
}

async function start() {
  watch.startWatching();
  shouldRun = true;
  setTimeout(stop, 9624);
  console.log(await blockCpu());
}

function stop() {
  console.log('Stopping cpu hog');
  shouldRun = false;
  watch;
  watch.stopWatching();
}

start();

module.exports = {
  immediateZalgo,
  timeoutZalgo,
  nextTickZalgo,
};
