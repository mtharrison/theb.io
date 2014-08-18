var OAuth = require('oauth');
var path = require('path');
var secrets = require('./secrets');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  secrets.oauth_key,
  secrets.oauth_secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    var loggedIn = !!request.session.get('logged_in');
    reply.view('index.html', {loggedIn: loggedIn.toString()});
  }
},
{
  method: 'GET',
  path: '/twitterBio',
  handler: function (request, reply) {
    var token = request.session.get('oauth_access_token');
    oauth.getProtectedResource(
      "https://api.twitter.com/1.1/account/verify_credentials.json", 
      "GET", 
      token.oauth_access_token, 
      token.oauth_access_token_secret,
      function (error, data, response) {
        var data = JSON.parse(data);
        reply(data.description);
      }
    );
  }
},
{
  method: 'GET',
  path: '/login',
  handler: function (request, reply) {
    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
      var token = {token: oauth_token, secret: oauth_token_secret};
      request.session.set('oauth', token);
      reply(oauth_token);
    });
  }
},
{
  method: 'GET',
  path: '/oauth_callback',
  handler: function (request, reply) {

    oauth.getOAuthAccessToken(
      request.session.get('oauth').token, 
      request.session.get('oauth').secret, 
      request.query.oauth_verifier, 
      function(error, oauth_access_token, oauth_access_token_secret, results2) {

        request.session.set('oauth_access_token', {oauth_access_token: oauth_access_token, oauth_access_token_secret: oauth_access_token_secret});

        request.session.set('logged_in', true);

        reply.redirect('/');

      });
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


