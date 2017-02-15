'use strict'

const Schema = require('./dbSchema');

let dbHelper = {
    addToDB: function (entry) {
      let query = Schema.where({row: entry.row});
      let schema = new Schema();
      return Schema.findOneAndUpdate({row: entry.row}, entry, {upsert: true, new: true}).exec();
      // , function(err, doc) {
      //   if(err) console.log(err);
      // });
    },
    retrieve: function () {
      return Schema.find({}).exec();
    },
    
    latestTime: function () {
      let query = Schema.where({row: 0});
      return query.findOne().exec();
    }
};

module.exports = dbHelper;
