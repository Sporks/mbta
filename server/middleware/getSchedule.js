'use strict'

const request = require('request');


module.exports = {
  download: function (req, res) {
    request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.sched = body;
        console.log("all good");
      }
      next();
    });
  }
};
