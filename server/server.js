'use strict'

const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const getSchedule = require('./middleware/getSchedule');

app.get('/', getSchedule.download, getSchedule.parse, function (req, res) {
  // console.log(res.sched);
  res.send(res.sched);
} );

app.listen(3000);

module.exports = app;
