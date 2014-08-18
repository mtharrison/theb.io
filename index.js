var Hapi = require('hapi');
var port = process.env.THEBIO_PORT || 80;
var secrets = require('./config/secrets');

var server = new Hapi.Server(port, require('./config/server-options'));

server.route(require('./config/routes'));

server.pack.register({
  plugin: require('yar'),
  options: {cookieOptions: {isSecure: false, password: secrets.cookie_password}}
}, function(err){
  if(err) throw err;
})

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
