var config = require('../config'),
	restClient = require('./restClient'),
	client = new restClient(config.webConnectionInfo.url);

module.exports = {

	// server.get('/dashboard', ensureAuthenticated, ...
	dashboard : function (req, res, next) {
		res.render('dashboard', {
			title : 'Admin Dashboard',
			currentUser : req.user
		});
	}

};