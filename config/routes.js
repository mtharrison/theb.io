var path = require('path');

module.exports = [{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply.file(path.join(__dirname, '../views/index.html'));
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