var server = require(__dirname + '/lib/mongodb_test_mock');

server.listen(27017, function() {
  console.log('fake mongo up');
});
