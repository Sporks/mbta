'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let trainSchema = new Schema({
  row: {type: Number, index: true},
  TimeStamp: {type: Date, default: Date.now},
  Origin: String,
  Trip: String,
  Destination: String,
  ScheduledTime: Date,
  Lateness: Number,
  Track: Number,
  Status: Number
});

module.exports = mongoose.model('train', trainSchema);
