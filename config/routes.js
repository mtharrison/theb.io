module.exports = [{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply.file('views/index.html');
	}
},
{
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: 'public'
		}
	}
}];