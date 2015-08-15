'use strict';

var express        = require('express');
var morgan         = require('morgan');
var compression    = require('compression');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var busboy         = require('connect-busboy');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var passport       = require('passport');
var dotenv         = require('dotenv');
var server         = express();

/* ====================================================== */

// Load environment variables from .env file
dotenv.load();

/* ====================================================== */

server.use(morgan('dev'));     // Logs all requests to the console
server.use(compression());     // Compresses response data with gzip/deflate
server.use(methodOverride());  // Simulates DELETE and PUT
server.use(bodyParser.json()); // Parses req.body json from html POST
server.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded req.body, including extended syntax
server.use(busboy());          // Parse multipart/form-data
server.use(cookieParser());
server.set('json spaces', 0);  // Remove superfluous spaces from JSON responses
server.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000*60*30 // only 30 minutes until user logs in
  },
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());

/* ====================================================== */

// Add headers
server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

/* ====================================================== */

// Mount the API
server.use('/api/v1', require('./api'));

/* ====================================================== */

// Respond with 404 to any routes not matching API endpoints
server.all('/*', function(req, res) {
    res.json({ status: 404, message: 'No endpoint exists at ' + req.originalUrl });
});

/* ====================================================== */

// start the server
server.listen(process.env.PORT || 3000);