'use strict'

const schema = require('./dbSchema');

let dbHelper = {
    addToDB: function (entries) {
      let query = schema.where({row: entry.row});
      let rows = [];
      for(let i = 0; i < Object.keys(entries); i++) {
        rows.push(entries[i].row);
      }
      console.log(rows);
    },

    latestTime: function () {
      let query = schema.where({row: 0});
      return query.findOne().exec();
    }
};

module.exports = dbHelper;
