'use strict';

var request = require('supertest');

describe('Controller: Auth', function() {

  var url = 'http://localhost:3000/api/v1/';

  it('should return an error on initial check', function(done) {
    // TODO: uncomment this test once database/auth logic is fleshed out

    // request(url)
    // .get('auth/check')
    // .end(function(err, res) {
    //   res.status.should.be.equal(401);
    //   done();
    // });

    done();
  });

  it('should register a new user', function(done) {
    var user = {
      username: 'jane.doe',
      email: 'jane.doe@gmail.com',
      password: 'janedoe1'
    };

    request(url)
    .post('auth/register')
    .send(user)
    .end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.be.instanceof(Object);
      done();
    });
  });

  it('should log a user in', function(done) {
    var user = {
      username: 'test',
      password: 'test'
    };

    request(url)
    .post('auth/login')
    .send(user)
    .end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.be.instanceof(Object);
      done();
    });
  });

  it('should receive a user when checking after log in', function(done) {
    var req = request(url).get('auth/check');

    req.cookies = global.cookies;

    req.end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.should.be.instanceof(Object);
      done();
    });
  });

  it('should log a user out', function(done) {
    var req = request(url).post('auth/logout');

    req.cookies = global.cookies;

    req.end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      done();
    });
  });

});