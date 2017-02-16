'use strict'

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const path = require('path');
const request = require('request');
const getSchedule = require('./middleware/getSchedule');
const dbHelper = require('./controllers/dbHelper');
const mongoose = require('mongoose');
const app = express();

const compiler = webpack(webpackConfig);

//Use native ES6 Promises with mongoose
mongoose.Promise = Promise;
mongoose.connect( 'mongodb://mbta:mbta@ds153239.mlab.com:53239/mbta');
const db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function () {
	console.log( "your db is open" );
} );

app.use(express.static(__dirname + './../www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));


app.get('/schedule', getSchedule.checkCache, getSchedule.download, function (req, res) {
  // console.log(res.sched);
  res.send(res.sched);
} );

app.listen(process.env.PORT || 8080, function(){
  console.log('Server is lisening on port 8080');
})

module.exports = app;
