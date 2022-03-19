// #!/usr/bin / env node
//!! load-generator.js
// import {NodeJS.Timeout} from 'NodeJS';
// @ts-ignore
// const load = loadGenerator();
// load.start(3);
export function loadGenerator() {
  return (() => {
    const watch = ProcessorUsage();
    watch.startWatching();
    const { min, max } = Math;
    var run = true;
    var shouldRun = true;
    var setToStop = false;
    var granularity = 0.1;
    var minimumLoadFactor = 0.99;
    var maximumLoadFactor = 0.99;
    var prevFactor = 0;
    var loadFactor = (minimumLoadFactor + maximumLoadFactor) / 2;
    var contX = 0;

    // @ts-ignore Not all code paths return a value.ts(7030)
    function blockCpuFor(ms: number) {
      var now = new Date().getTime();
      var result = 0;
      while (run && shouldRun) {
        result += Math.random() * Math.random();
        // console.log('Cycle:', Math.random());
        loadFactor = Math.random();
        if (!shouldRun) {
          timeout.A.unref();
          timeout.B.unref();
          clearTimeout(timeout.A);
          clearTimeout(timeout.B);
          watch.stopWatching();
          shouldRun = false;
          return;
        }
        if (new Date().getTime() > now + ms) return result;
      }
    }
    let x = 0;
    // @ts-ignore
    let timeout: { A: NodeJS.Timeout; B: NodeJS.Timeout } = {
      // @ts-ignore Type 'null' is not assignable to type 'Timeout'.ts(2322)
      A: null,
      // @ts-ignore Type 'null' is not assignable to type 'Timeout'.ts(2322)
      B: null,
    };
    function start(sec: number) {
      run = true;
      var minLoad = min(loadFactor * minimumLoadFactor, maximumLoadFactor);
      var maxLoad = max(loadFactor * maximumLoadFactor, minimumLoadFactor);
      var averageLoad = (maxLoad + minLoad) / 2;
      const forecast = percent(prevFactor);
      // @ts-ignore Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
      const process = percent(global.processCpuUsage || 0) / 100;
      var loadFactor_ = min(
        max(max(min(max(maxLoad, minLoad), 0.99), 0.01), minimumLoadFactor),
        maximumLoadFactor
      );
      // @ts-ignore Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
      const y = prevFactor / (global.processCpuUsage || 0.01);
      x = percent(percent(1 / y / 100) - 100) + 0.01;
      if (contX > 2) {
        console.log({
          minLoad: percent(minLoad),
          avgMin: percent(averageLoad - minLoad),
          averageLoad: percent(averageLoad),
          avgMax: percent(averageLoad - maxLoad),
          maxLoad: percent(maxLoad),
          controlMax: percent(
            percent(maxLoad) +
              percent(averageLoad - maxLoad) -
              percent(averageLoad)
          ),
          controlMin: percent(
            percent(minLoad) +
              percent(averageLoad - minLoad) -
              percent(averageLoad)
          ),
          loadFactor: percent(loadFactor),
          forecast,
          current: 'process cpu usage: ' + process + '%',
          x: x / 100,
        });
      } else {
        contX++;
      }

      prevFactor = loadFactor_;
      blockCpuFor(1000 * granularity * (loadFactor_ / granularity));
      // @ts-ignore Cannot find name 'Timeout'.ts(2304)
      if (shouldRun) {
        // @ts-ignore Type 'number' is not assignable to type 'Timeout'.ts(2322)
        const timeout_A: NodeJS.Timeout = setTimeout(
          // { A: NodeJS.Timeout; B: NodeJS.Timeout }
          start,
          1000 * granularity * ((1 - loadFactor_) / granularity)
        );
        timeout.A = timeout_A;
        if (!setToStop) {
          setToStop = true;
          timeout.B = setTimeout(
            stop(timeout),
            sec * 1000 + 1000 * granularity * ((1 - loadFactor_) / granularity)
          );
        }
      } else {
        shouldRun = false;
        timeout.A.unref();
        timeout.B.unref();
        clearTimeout(timeout.A);
        clearTimeout(timeout.B);
        watch.stopWatching();
      }
    }

    // setInterval(function () {
    //   console.log(
    //     'current process cpu usage: ' + (global.processCpuUsage || 0) + '%'
    //   );
    // }, 1000 * granularity);

    // if (process.argv[2]) {
    //   var value = parseFloat(process.argv[2]);
    //   if (value < 0 || value > 1) {
    //     console.log('please give desired load value as a range [0..1]');
    //     process.exit(-1);
    //   } else {
    //     loadFactor = value;
    //   }
    // }

    function percent(num: number) {
      return Math.round(num * 10000) / 100;
    }
    // @ts-ignore Parameter 'timeout' implicitly has an 'any' type.ts(7006)
    function stop(timeout) {
      return () => {
        shouldRun = false;
        timeout.A.unref();
        timeout.B.unref();
        clearTimeout(timeout.A);
        clearTimeout(timeout.B);
        watch.stopWatching();
        return;
      };
    }
    return {
      start, //: (_: any) => console.log('UNDEFINED START FUCNTION'),
      stop, //: (_: any) => console.log('UNDEFINED STOP FUCNTION'),
    };
    // instance.start = start;
    // instance.stop = stop;
  })();
}
// void ProcessorUsage, start;

function ProcessorUsage() {
  return (() => {
    var fs = require('fs');
    console.log('ProcessorUsage called');
    function ProcessUsageWatcher() {
      //@ts-ignore Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
      global.pubcrawler = global.pubcrawler || {};
      //@ts-ignore Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
      global.pubcrawler.processCpuUsage = 0;
    }

    ProcessUsageWatcher.prototype = {
      startWatching: function () {
        if (this.interval) return this;

        //@ts-ignore Parameter 'cb' implicitly has an 'any' type.ts(7006)
        var getUsage = function (cb) {
          //@ts-ignore Parameter '_err' & 'data' implicitly have an 'any' type.ts(7006)
          fs.readFile('/proc/' + process.pid + '/stat', function (_err, data) {
            var elems = data.toString().split(' ');
            var utime = parseInt(elems[13]);
            var stime = parseInt(elems[14]);

            cb(utime + stime);
          });
        };

        this.interval = setInterval(function () {
          //@ts-ignore Parameter 'startTime' implicitly has an 'any' type.ts(7006)
          getUsage(function (startTime) {
            setTimeout(function () {
              //@ts-ignore Parameter 'endTime' implicitly has an 'any' type.ts(7006)
              getUsage(function (endTime) {
                var delta = endTime - startTime;
                var percentage = Math.round(10 * delta) / 10;
                //@ts-ignore Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
                global.processCpuUsage = percentage;
              });
            }, 1000);
          });
        }, 10);
        return this;
      },

      stopWatching: function () {
        if (this.interval) clearInterval(this.interval);
      },
    };
    // @ts-ignore 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.ts(7009)
    var instance = new ProcessUsageWatcher();
    exports.startWatching = instance.startWatching;
    exports.stopWatching = instance.stopWatching;
    return {
      startWatching: instance.startWatching,
      stopWatching: instance.stopWatching,
    };
  })();
}
// void ProcessorUsage, loadGenerator, start;
