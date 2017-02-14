'use strict'

const request = require('request');
const addToDB = require('./dbHelper');
// Use csvjson npm module from https://www.npmjs.com/package/csvjson
const csvjson = require('csvjson');

//TODO ADD CACHING 30s

module.exports = {
  download: function (req, res, next) {
    request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.sched = body;
      }
      next();
    });
  },

  parse: function (req, res, next) {
    var options = {
      delimeter: ',',
      quote: '"'
    };
    var schedJSON = csvjson.toObject(res.sched, options);
    // Add data to mongo db
    addToDB
  }
};
