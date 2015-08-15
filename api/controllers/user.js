'use strict';

var when = require('when');

/* ====================================================== */

/**
 * @api {get} /user/:id Get User
 * @apiName Get
 * @apiGroup User
 *
 * @apiParam {Number} id User's id
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {Object} data retrieved User object
 */
exports.get = function(req, res) {

  var getUser = function(userId) {
    var deferred = when.defer();
    var user = {}     // TODO: retrieve user from database
    var error = null; // TODO: determine if there's actually been an error

    if ( error ) {
      deferred.reject({ status: 500, message: 'Failed to update user: ' + userId });
    } else {
      deferred.resolve(user);
    }

    return deferred.promise;
  };

  getUser(req.params.id).then(function(user) {
    res.status(200).json({ status: 200, data: user });
  }).catch(function(err) {
    res.status(err.status).json({ status: err.status, data: err.message.toString() });
  });

};

/* ====================================================== */

/**
 * @api {patch} /user/:id Update User
 * @apiName Update
 * @apiGroup User
 *
 * @apiParam {Number} id User's id
 * @apiParam {Object} updates Object containing fields to update on user
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {Object} data updated User object
 */
exports.update = function(req, res) {

  var updateUser = function(userId, updates) {
    var deferred = when.defer();
    var error = null; // TODO: determine if there's actually been an error

    // TODO: retrieve and update user
    if ( error ) {
      deferred.reject({ status: 500, message: 'Failed to update user: ' + userId });
    } else {
      deferred.resolve({});
    }

    return deferred.promise;
  };

  updateUser(req.params.id, req.body).then(function(updatedUser) {
    res.status(200).json({ status: 200, data: updatedUser });
  }).catch(function(err) {
    res.status(err.status).json({ status: err.status, data: err.message.toString() });
  });

};

/* ====================================================== */

/**
 * @api {delete} /user/:id Delete User
 * @apiName Delete
 * @apiGroup User
 *
 * @apiParam {Number} id User's id
 *
 * @apiSuccess {Number} status HTTP status code (200)
 * @apiSuccess {String} data string indicating successful deletion
 */
exports.delete = function(req, res) {

  var deleteUser = function(userId) {
    var deferred = when.defer();
    var error = null; // TODO: determine if there's actually been an error

    if ( error ) {
      deferred.reject({ status: 500, message: 'Failed to delete user: ' + userId });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  };

  deleteUser(req.params.id).then(function() {
    res.status(200).json({ status: 200, data: 'User successfully deleted' });
  }).catch(function(err) {
    res.status(err.status).json({ status: err.status, data: err.message.toString() });
  });

};