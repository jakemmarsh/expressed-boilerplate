'use strict';

before(function(done) {

  // Ensure that 'should' library methods will be
  // available to all tests
  global.should = require('should');
  global.sinon = require('sinon');

  // Start and configure the server
  require('../server');

  // Wait half a second before calling "done" to ensure
  // that server is up and running
  setTimeout(done, 500);

});