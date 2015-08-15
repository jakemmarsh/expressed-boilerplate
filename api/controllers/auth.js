'use strict';

var _        = require('lodash');
var when     = require('when');
var passport = require('passport');

/* ====================================================== */

exports.checkStatus = function(req, res, next) {

  // TODO: replace with actual checking logic
  // req.isAuthenticated() || (req.session && req.session.user
  if ( true ) {
    return next();
  } else {
    return res.status(401).json({ status: 401, data: 'User must be logged in.' });
  }

};

/* ====================================================== */

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {Object} data retrieved User object
 */
exports.login = function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if ( err ) {
      return next(err);
    } else if ( _.isEmpty(user) ) {
      return res.status(401).json({ status: 401, data: info.message || 'Authentication failed.' });
    } else {
      req.login(user, function(err) {
        if ( err ) {
          console.log('error:', err);
          return next(err);
        } else {
          req.session.cookie.maxAge = 1000*60*60*24*7*4; // four weeks
          return res.status(200).json({ status: 200, data: user });
        }
      });
    }
  })(req, res, next);

};

/* ====================================================== */

/**
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {Object} data created User object
 */
exports.register = function(req, res) {

  var registerUser = function(user) {
    var deferred = when.defer();
    var error = null; // TODO: determine if there's actually been an error

    // TODO: save user in database
    if ( error ) {
      deferred.reject({ status: 500, message: 'Failed to register new user.' });
    } else {
      deferred.resolve(user);
    }

    return deferred.promise;
  };

  registerUser(req.body).then(function(user) {
    res.status(200).json({ status: 200, data: user });
  }).catch(function(err) {
    res.status(err.status).json({ status: err.status, data: err.message.toString() });
  });

};

/* ====================================================== */

/**
 * @api {post} /auth/logout Logout
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {String} data string indicating successful logout
 */
exports.logout = function(req, res) {

  req.logout();
  res.status(200).json({ status: 200, data: 'User successfully logged out.' });

};