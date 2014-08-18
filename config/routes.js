var OAuth = require('oauth');
var oauthConfig = require('./oauth.json');
var path = require('path');
var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	oauthConfig.key,
	oauthConfig.secret,
	'1.0A',
	null,
	'HMAC-SHA1'
	);

module.exports = [{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply.file(path.join(__dirname, '../views/index.html'));
	}
},
{
	method: 'GET',
	path: '/login',
	handler: function (request, reply) {
		oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
			var token = {token: oauth_token, secret: oauth_token_secret};
			console.log("req token", token);
			reply(oauth_token).state('oauth', token);
		});
	}
},
{
	method: 'GET',
	path: '/oauth_callback',
	handler: function (request, reply) {

		oauth.getOAuthAccessToken(
			request.state.oauth.token, 
			request.state.oauth.secret, 
			request.query.oauth_verifier, 
			function(error, oauth_access_token, oauth_access_token_secret, results2) {
				oauth.getProtectedResource(
					"https://api.twitter.com/1.1/account/verify_credentials.json", 
					"GET", 
					oauth_access_token, 
					oauth_access_token_secret,
					function (error, data, response) {
						reply(data);
					}
				);
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