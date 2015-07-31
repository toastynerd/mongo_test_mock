'use strict';

var opCodes = require(__dirname + '/op_codes');

var buildHeader = function(reqHeader) {

};

var buildQueryReponse = function(reqHeader) {
  
};

module.exports = exports = function(header, request) {
  if (header.opName === 'OP_QUERY') return (buildQueryReponse(header));
  return null;
};
