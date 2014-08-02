/**
 * Module dependencies
 */

var write = require('fs').writeFile;
var extend = require('extend.js');
var enqueue = require('enqueue');

/**
 * Export `atomic`
 */

module.exports = function(path) {
  if (atomics[path]) return atomics[path];
  return atomics[path] = atomic(path);
};

/**
 * path cache
 */

var atomics = {};

/**
 * Initialize `atomic`
 */

function atomic(path) {
  var map = json(path);

  return enqueue(function(obj, fn) {
    map = extend(map, obj);
    write(path, stringify(map), fn);
  });
}

/**
 * Load the `json`
 *
 * @param {String} path
 * @return {Object}
 * @api private
 */

function json(path) {
  try {
    return require(path);
  } catch(e) {
    return {};
  }
}

/**
 * Stringify
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function stringify(obj) {
  return JSON.stringify(obj, true, 2);
}
