'use strict';

var passport              = require('passport');
var _                     = require('lodash');
var when                  = require('when');
var LocalStrategy         = require('passport-local').Strategy;

/* ====================================================== */

module.exports = function() {

  // Define logic to be used to retrieve/verify users on login
  passport.use(new LocalStrategy(function(username, password, done) {
    var user = { username: username }; // TODO: retrieve user from database
    var passwordCorrect = true;        // TODO: check/verify password
    var error = null;


    if ( _.isEmpty(user) ) {
      return done(null, false, { message: 'No user could be found with that username.' });
    } else if ( !passwordCorrect ) {
      return done(null, false, { message: 'Incorrect password.' });
    } else {
      return done(null, user);
    }
  }));

  /* ====================================================== */

  // Convert user into value to be saved in login session
  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  /* ====================================================== */

  // Retrieve full user object from value saved in session
  passport.deserializeUser(function(username, done) {
    var user = { username: username }; // TODO: retrieve user from database

    done(null, user);
  });

};