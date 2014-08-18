var Hapi = require('hapi');
var port = process.env.THEBIO_PORT || 80;

var server = new Hapi.Server(port, require('./config/server-options'));

server.state('oauth', {
    encoding: 'base64json'
});

server.route(require('./config/routes'));

server.start(function () {
	console.log('Server running at:', server.info.uri);
});
