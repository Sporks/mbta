'use strict'

const request = require('request');
const dbHelper = require('../controllers/dbHelper');
// Use csvjson npm module from https://www.npmjs.com/package/csvjson
const csvjson = require('csvjson');
//Time to cache in seconds
const cacheTime = 30;


//TODO ADD CACHING 30s

let schedules = {
  checkCache: function (req, res, next) {
    console.log("check");
    /* Check to see the last time the csv was retrieved so as not to overload the server
       If the the latest time was 30 seconds or less, just return the information in the db
       otherwise, lets go fetch and parse it.
       If it doesn't exist at all, fetch and parse it */
    res.sched = schedules.download(res);

    // let lastTime = dbHelper.latestTime();
    // if (lastTime === -1 || lastTime > cacheTime * 1000) {
    //   res.sched = this.download();
    // }
    // else {
    //   console.log('lastTime')
    //   res.sched = "333";
    // }
    next();
  },

  download: function (res) {
    //csvjson options
    console.log("download")
    let options = {
      delimeter: ',',
      quote: '"'
    };
    request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.sched = csvjson.toObject(body, options);
      }
      else {
        console.log('Could not retreive schedule');
        res.sched = null;
      }
    });
  }
};
module.exports = schedules;
