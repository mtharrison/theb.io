var path = require('path');

module.exports = {
	views: {
		engines: {
			html: require('handlebars')
		},
		path: path.join(__dirname, '../views')
	}
};