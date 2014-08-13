var Hapi = require('hapi');

var server = new Hapi.Server(80, require('./config/server-options'));

server.state('oauth', {
    encoding: 'base64json'
});

server.route(require('./config/routes'));

server.start(function () {
	console.log('Server running at:', server.info.uri);
});