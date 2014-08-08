var hapi = require('hapi');

var Hapi = require('hapi');
var server = new Hapi.Server(80);

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');

  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
