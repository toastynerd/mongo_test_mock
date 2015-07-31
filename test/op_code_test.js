'use strict';

var expect = require('chai').expect;
var opcodes = require(__dirname + '/../lib/op_codes');

describe('opcodes', function() {
  it('should support reverse lookup', function() {
    expect(opcodes['OP_REPLY']).to.eql(1);
  });
});
