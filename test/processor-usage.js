'use strict';
// !! processor-usage.js
var fs = require('fs');

function ProcessUsageWatcher() {
  global.pubcrawler = global.pubcrawler || {};
  global.pubcrawler.processCpuUsage = 0;
}

ProcessUsageWatcher.prototype = {
  startWatching: function () {
    if (this.interval) return this;

    var getUsage = function (cb) {
      fs.readFile('/proc/' + process.pid + '/stat', function (_err, data) {
        var elems = data.toString().split(' ');
        var utime = parseInt(elems[13]);
        var stime = parseInt(elems[14]);

        cb(utime + stime);
      });
    };

    this.interval = setInterval(function () {
      getUsage(function (startTime) {
        setTimeout(function () {
          getUsage(function (endTime) {
            var delta = endTime - startTime;
            var percentage = Math.round(10 * delta) / 10;
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

var instance = new ProcessUsageWatcher();
exports.startWatching = instance.startWatching;
exports.stopWatching = instance.stopWatching;
