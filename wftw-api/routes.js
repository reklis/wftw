var restify = require('restify'),
	accounts = require('./controllers/account'),
	vendors = require('./controllers/vendor');

module.exports = function (server) {
	server.get('/api', function (req, res, next) {
		var routes = [
			'GET     /api',
			'GET     /api/accounts/:id',
			'GET     /api/accounts',
			'PUT     /api/accounts',
			'POST    /api/accounts/:username',
			'GET     /api/accounts/:username/auth/:password',
			'POST    /api/accounts/:username/resetpassword',
			'DELETE  /api/accounts/:id',
			'GET     /api/vendors/:id',
			'GET     /api/vendors',
			'PUT     /api/vendors',
			'POST    /api/vendors/:id',
			'DELETE  /api/vendors/:id'
		];
		res.set('Content-Type', 'text/plain');
		res.send(200, routes.join('\n'));
		next();
	});

	server.get('/api/accounts/:id', accounts.get);
	server.get('/api/accounts', accounts.getAll);
	server.put('/api/accounts', accounts.add);
	server.post('/api/accounts/:username', accounts.add);
	server.get('/api/accounts/:username/auth/:password', accounts.authenticate);
	server.post('/api/accounts/:username/resetpassword', accounts.resetPassword);
	server.del('/api/accounts/:id', accounts.remove);

	server.get('/api/vendors/:id', vendors.get);
	server.get('/api/vendors', vendors.getAll);
	server.put('/api/vendors', vendors.add);
	server.post('/api/vendors/:id', vendors.update);
	server.del('/api/vendors/:id', vendors.remove);
};