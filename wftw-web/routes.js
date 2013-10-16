var admin = require('./modules/admin'),
	auth = require('./modules/auth'),
	index = require('./modules/index'),
	passport = require('passport');

module.exports = function (server) {
	server.get('/account', auth.ensureAuthenticated, auth.account);
	server.post('/changePassword', auth.ensureAuthenticated, auth.changePassword);
	server.get('/login', auth.login);
	server.post('/login', passport.authenticate('local', {
		successRedirect : '/home',
		failureRedirect : '/login'
	}));
	server.get('/logout', auth.ensureAuthenticated, auth.logout);
	server.get('/register', auth.register);
	server.post('/register', auth.registerAccount, passport.authenticate('local', {
		successRedirect : '/home',
		failureRedirect : '/login'
	}));

	server.get('/admin', auth.ensureAuthenticated, auth.ensureAdmin, admin.dashboard);
	
	server.get('/2013/vendors', index.eventvendors);
	server.get('/vendors', index.vendors);
	server.post('/vendorregistration', index.vendorregistration);

	// Catch everything else
	server.get('*', function (req, res) {
		var content = req.url.toString();
		res.render(content.substring(1, content.length), {
			currentUser: req.user
		});
	});
}
