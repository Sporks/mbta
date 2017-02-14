'use strict'

const express = require('express');
const app = express();
const path = require('path');
const request = require('request');


app.get('/', function (req, res) {
  res.send("HELLO");
} );

app.listen(3000);

module.exports = app;
