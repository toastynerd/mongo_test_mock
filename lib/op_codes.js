'use strict';

var opCodes = {
  1:    'OP_REPLY',
  1000: 'OP_MSG',
  2001: 'OP_UPDATE',
  2002: 'OP_INSERT',
  2003: 'OP_RESERVED',
  2004: 'OP_QUERY',
  2005: 'OP_GET_MORE',
  2006: 'OP_DELETE',
  2007: 'OP_KILL_CURSORS' 
};

//allow reverse lookup
Object.keys(opCodes).forEach(function(key) {
  opCodes[opCodes[key]] = parseInt(key);
});

module.exports = exports = opCodes;
