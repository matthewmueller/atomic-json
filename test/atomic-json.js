/**
 * Module Dependencies
 */

var read = require('fs').readFileSync;
var unlink = require('fs').unlink;
var join = require('path').join;
var assert = require('assert');
var atomic = require('../');
var noop = function(){};

/**
 * Temporary
 */

var tmp = join(__dirname, 'tmp.json');

/**
 * Tests
 */

describe('atomic-json', function() {

  afterEach(function(done) {
    unlink(done);
  })

  it('should add to an object', function(done) {
    var json = atomic(tmp)
    for (var i = 1; i <= 100; i++) {
      var key = {};
      key[i] = i;
      if (i == 100) json(key, next);
      else json(key, noop);
    }

    function next(err) {
      if (err) done(err);
      var keys = Object.keys(JSON.parse(read(tmp, 'utf8')));
      assert.deepEqual(range(1, 100), keys);
      done();
    }
  })

  it('should add to an array', function() {
    var json = atomic(tmp);
    for (var i = 0; i <= 100; i++) {

    }
  })

});

/**
 * Range
 */

function range(from, to) {
  var out = [];
  for (var i = from; i <= to; i++) out.push(i + '');
  return out;
}
