var net = require('net');
var request = new Buffer('OAAAAAAAAAAAAAAA1AcAAAAAAABzeXN0ZW0uJGNtZAAAAAAA/////xAAAAAIaXNtYXN0ZXIAAQA=', 'base64');
var BSON = require('bson').BSONPure.BSON;
var bson = new BSON();

var socket = net.createConnection(27017);
socket.on('data', function(data) {
  console.log(bson.deserialize(data.slice(36, 194)));
  console.log(data.toString('hex', 36, 194));
});

socket.on('end', function() {
  console.log('disconnected');
});

socket.write(request);
