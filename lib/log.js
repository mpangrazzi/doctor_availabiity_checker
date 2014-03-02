/**
 * Basic logger
 */

var L = require('npmlog');

L.heading = 'dav';
L.level = 'verbose';

module.exports = function() {
  return L.log.apply(this, arguments);
};
