'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let trainSchema = new Schema({
  row: {type: Number, index: true},
  timeNow: {type: Date, default: Date.now},
  origin: String,
  trip: String,
  destination: String,
  scheduled: Date,
  lateness: Number,
  track: Number,
  status: Number
});

module.exports = mongoose.model('train', trainSchema);
