'use strict'

const schema = require('./dbSchema');

let dbHelper = {
    checkDB: function (req, res, next) {

    },

    latestTime: function (req, res, next) {
      let query = schema.where({row: 1});
      var lastTime = 4;
      return query.findOne(function(err, found) {
        if(err) console.log('error occurred');

        if(!found) {
          res.lastTime = -1;
          next();
        }

        if(found) {
          res.lastTime = Date.now() - found.timeNow;
          next();
        }
      });
    }
};

module.exports = dbHelper;
