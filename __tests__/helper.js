'use strict';

before(function(done) {
  // Ensure that 'should' and 'sinon' library methods
  // will be available to all tests
  global.should = require('should');
  global.sinon = require('sinon');

  // Start and configure the server
  require('../server');

  // Wait one second before calling "done" to ensure
  // that server is up and running
  setTimeout(done, 1000);
});

beforeEach(function() {
  global.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  global.sandbox.restore();
});
