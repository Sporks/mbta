'use strict'

const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const getSchedule = require('./middleware/getSchedule');
const dbHelper = require('./controllers/dbHelper');
const mongoose = require('mongoose');
//TODO Convert from middleware to promises
mongoose.Promise = Promise;

mongoose.connect( 'mongodb://mbta:mbta@ds153239.mlab.com:53239/mbta');
const db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function () {
	console.log( "your db is open" );
} );


app.get('/', getSchedule.checkCache, getSchedule.download, function (req, res) {
  // console.log(res.sched);
  res.send(res.sched);
} );

app.listen(3000);

module.exports = app;
