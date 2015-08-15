'use strict';

var request = require('supertest');
var url     = 'http://localhost:3000/v1/';
var agent   = request.agent(url);

module.exports = function(name, tests) {

  describe(name, function() {

    this.timeout(5000);

    beforeEach(function(done) {
      var user = {
        username: 'test',
        password: 'test'
      };

      agent.post('auth/login')
      .send(user)
      .end(function(err, res) {
        if ( !global.agent ) { global.agent = agent; }
        if ( res.headers['set-cookie'] ) {
          global.cookies = res.headers['set-cookie'].pop().split(';')[0];
        } else {
          global.agent.saveCookies(res);
        }
        done();
      });
    });

    tests.call(this);

  });

};