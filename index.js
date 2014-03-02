
var jsdom   = require('jsdom');
var url     = require('url');
var util    = require('util');

var L = require('./lib/log');
var checker = require('./lib/checker');


var doctorName = 'Pallanch Romano';


checker(doctorName, function(err, availability) {

  if (err) {
    L('error', 'dav', 'Error: %s', err);
    process.exit(1);
  } else {
    L('info', 'dav', '%s => %s', doctorName, availability);
  }

  process.exit(0);

});


process.on('uncaughtException', function(err) {
  console.log("NODE uncaughtException: " + err.stack);
  process.exit(1);
});
