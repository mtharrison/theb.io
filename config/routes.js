var Twitter = require('../lib/twitter');
var path = require('path');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {

    reply.view('index.html', {loggedIn: request.session.get('logged_in')});
  }
},
{
  method: 'GET',
  path: '/twitterBio',
  handler: function (request, reply) {

    Twitter.handleGetBio(request, reply);
  }
},
{
  method: 'GET',
  path: '/login',
  handler: function (request, reply) {

    Twitter.handleLogin(request, reply);
  }
},
{
  method: 'GET',
  path: '/oauth_callback',
  handler: function (request, reply) {

    Twitter.handleOAuthCallback(request, reply);
  }
},
{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join(__dirname, '../public')
    }
  }
}];


