'use strict';
var opCodes = require(__dirname + '/op_codes');
var BSON = require('bson').BSONPure.BSON;
var bson = new BSON();

var processHeader = function(header, obj) {
  obj.messageLength = header.readUInt32LE(0);
  obj.requsetId = header.readUInt32LE(4);
  obj.responseTo = header.readUInt32LE(8);
  obj.opCode = header.readUInt32LE(12);
  obj.opName = opCodes[obj.opCode];
};

var processOpQuery = function(header, obj) {
  obj.flags = header.readUInt32LE(16);
  var collectionName = '';
  for(var i = 20; header.toString('utf8', i, i + 1) !== '\0'; i++) {
    collectionName += header.toString('utf8', i, i + 1);
  }
  var cstringSize = i - 20;
  obj.fullCollectionName = collectionName;
  obj.numberToSkip = header.readUInt32LE(cstringSize + 20);
  obj.numberToReturn = header.readUInt32LE(cstringSize + 24);
  obj.query = bson.deserialize(header.slice(29 + cstringSize, header.messageLength));
};

module.exports = exports = function(header) {
  var obj = {};
  processHeader(header, obj);
  if (obj.opName === 'OP_QUERY') processOpQuery(header, obj);
  return obj;
};
