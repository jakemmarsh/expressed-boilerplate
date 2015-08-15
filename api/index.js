'use strict';

var path        = require('path');
var express     = require('express');
var passport    = require('./utils/passport');
var controllers = require(path.join(__dirname, 'controllers'));
var api         = express.Router();

/* ====================================================== */

// Initialize Passport
passport();

/* ====================================================== */

// Auth endpoints
api.post('/auth/register', controllers.auth.register);
api.post('/auth/login', controllers.auth.login);
api.post('/auth/logout', controllers.auth.checkStatus, controllers.auth.logout);
api.get('/auth/check', controllers.auth.checkStatus, function(req, res) {
  // TODO: return req.user instead of empty object as data
  res.status(200).json({ status: 200, data: {} });
});

/* ====================================================== */

// User endpoints
api.get('/user/:identifier', controllers.user.get);
api.patch('/user/:id', controllers.auth.checkStatus, controllers.user.update);
api.delete('/user/:id', controllers.auth.checkStatus, controllers.user.delete);

/* ====================================================== */

module.exports = api;