var net = require('net');
var processReq = require(__dirname + '/process_request');
var createResponse = require(__dirname + '/response');
var EE = require('events').EventEmitter;

var server = net.createServer(function(socket) {
  console.log('connected');
  var ee = new EE();
  ee.on('readyToProcess', function(data) {
    console.dir(processReq(data));
    ee.emit('sendResponse', createResponse(processReq(data)));
  });

  ee.on('sendResponse', function(data) {
    if (data) socket.write(data);
    socket.end();
  });

  var finalBuf = new Buffer('');

  socket.on('data', function(data) {
    finalBuf = Buffer.concat([finalBuf, data]);

    if (finalBuf.length && finalBuf.readUInt32LE(0) === this.bytesRead) {
      ee.emit('readyToProcess', new Buffer(finalBuf));
      finalBuf = new Buffer('');
    }
  });

  socket.on('end', function() {
    console.log('disconnected');
  });
});

module.exports = exports = server;
