'use strict'

const request = require('request');
const dbHelper = require('../controllers/dbHelper');
// Use csvjson npm module from https://www.npmjs.com/package/csvjson
const csvjson = require('csvjson');
//Time to cache in ms
const cacheTime = 30000;


//TODO ADD CACHING 30s

let schedules = {
  checkCache: function (req, res, next) {
    /* Check to see the last time the csv was retrieved so as not to overload the server
       If the the latest time was 30 seconds or less, just return the information in the db
       otherwise, lets go fetch and parse it.
       If it doesn't exist at all, fetch and parse it */
    dbHelper.latestTime().then(function(doc) {
      if(!doc || (Date.now() - doc.timeRetrieved) > cacheTime) {
        next();
      }
      //Just get the information from the DB and skip the rest of the middleware
      else {
        let x = dbHelper.retrieve();
        x.then(function(doc) {
          res.sched = doc;
          res.send(doc);
        });
      }
    },
    function(err){
      console.log(err);
    });
    // next();
  },

  download: function (req, res, next) {
    //csvjson options
    let options = {
      delimeter: ',',
      quote: '"'
    };
    //Create an array for all the documents to be put into response
    res.sched = [];
    let promises = [];
    request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let entries = csvjson.toObject(body, options);
        let row = 0;
        entries.forEach(entry =>  {
          //Reset time to ms
          entry.ScheduledTime *= 1000;
          entry.TimeStamp *= 1000;
          entry.row = row;
          row++;
          promises.push(dbHelper.addToDB(entry));
         });
      }
      else {
        console.log('Could not retreive schedule');
        res.sched = 'Could not retreive schedule';
        res.send(res.sched);
      }
      Promise.all(promises).then(function(vals) {
        res.sched = vals;
        next();
      });
    });
  }
};
module.exports = schedules;
