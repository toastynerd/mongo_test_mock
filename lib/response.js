'use strict';

var opCodes = require(__dirname + '/op_codes');
var BSON = require('bson').BSONPure.BSON;
var bson = new BSON();

var buildHeader = function(reqHeader, resHeader) {
  debugger;
  resHeader.writeUInt32LE(reqHeader.requestID, 4);
  resHeader.writeUInt32LE(reqHeader.requestID, 8);
  resHeader.writeUInt32LE(opCodes.OP_REPLY, 12);
};

var buildQueryBSONResponse = function(reqHeader, resHeader) {
  //TODO: move these values into some constants somewher
  var object = {
    ismaster: true,
    maxBsonObjectSize: 16777216,
    maxMessageSizeBytes: 48000000,
    maxWriteBatchSize: 1000,
    localTime: new Date(),
    maxWireVersion: 3,
    minWireVersion: 0,
    ok: 1
  };
  //TODO: rewrite this to not convert to string then back to buffer
  return bson.serialize(object);
};

var buildQueryResponse = function(reqHeader) {
  var resHeader = new Buffer(36);
  buildHeader(reqHeader, resHeader);
  resHeader.writeUInt32LE(resHeader.length);
  resHeader.writeUInt32LE(8, 16);
  resHeader.writeUInt32LE(0, 20);
  resHeader.writeUInt32LE(0, 24);
  resHeader.writeUInt32LE(0, 28);
  resHeader.writeUInt32LE(1, 32);
  var finalHeader = Buffer.concat([resHeader, buildQueryBSONResponse(reqHeader, resHeader)]); 
  finalHeader.writeUInt32LE(finalHeader.length);
  
  return finalHeader;
};

module.exports = exports = function(header, request) {
  if (header.opName === 'OP_QUERY') return (buildQueryResponse(header));
  return null;
};
