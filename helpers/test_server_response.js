var net = require('net');
var request = new Buffer('OAAAAAAAAAAAAAAA1AcAAAAAAABzeXN0ZW0uJGNtZAAAAAAA/////xAAAAAIaXNtYXN0ZXIAAQA=', 'base64');
var BSON = require('bson').BSONPure.BSON;
var bson = new BSON();

var socket = net.createConnection(27017);
socket.on('data', function(data) {
  var size = data.readUInt32LE(0);
  console.log('size: ' + size);
  console.log('response flags: '  + data.readUInt32LE(16));
  console.log('cursor: ' + ((data.readUInt32LE(20) << 8) + data.readUInt32LE(24)));
  console.log('position: ' + data.readUInt32LE(28));
  console.log('number of docs: ' + data.readUInt32LE(32));
  console.log(bson.deserialize(data.slice(36, size)));
});

socket.on('end', function() {
  console.log('disconnected');
});

socket.write(request);
