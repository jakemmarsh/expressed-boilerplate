'use strict';

var request = require('supertest');
var when    = require('when');

require('../../utils/createAuthenticatedSuite')('Controller: User', function() {

  var url = 'http://localhost:3000/api/v1/';

  it('should return a single user by ID', function(done) {
    var req = request(url).get('user/1');

    req.cookies = global.cookies;

    req.end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.be.instanceof(Object);
      done();
    });
  });

  it('should update a specific user\'s attributes', function(done) {
    var req = request(url).patch('user/1');
    var updates = {
      email: 'newemail@new.com'
    };

    req.cookies = global.cookies;

    req.send(updates).end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.be.instanceof(Object);
      done();
    });
  });

  it('should delete a user', function(done) {
    var req = request(url).del('user/1');

    req.cookies = global.cookies;

    req.end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  });

});