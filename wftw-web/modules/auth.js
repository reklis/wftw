var config = require('../config'),
	restClient = require('./restClient'),
	client = new restClient(config.webConnectionInfo.url);

function isAdmin (req) {
	if (req.user && req.user.type == 0) {
		return true;
	} else {
		return false;
	}
}

module.exports = {

	ensureAuthenticated : function (req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/login');
		}
	},

	ensureAdmin : function (req, res, next) {
		console.log('%j %j', req.user, req.user.type);
		if (isAdmin(req)) {
			next();
		} else {
			res.redirect('/home');
		}
	},

	isAdmin : isAdmin,

	// server.get('/register', ...)
	register : function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/home');
		} else {
			res.render('register', {
				title : 'Register User'
			});
		}
	},

	// server.post('/register', ...)
	registerAccount : function (req, res, next) {
		client.addAccount(req.body.username, req.body.password1, req.body.password2, req.body.firstname, req.body.lastname, function (err, account) {
			if (err) {
				res.render('register', {
					title : 'Register User',
					registrationerror : err.message
				});
			} else {
				next();
			}
		});
	},

	// server.get('/login', ...
	login : function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/home');
		} else {
			res.render('login', {
				title : 'Login'
			});
		}
	},

	changePassword : function (req, res, next) {
		if (req.body.password !== req.body.passwordconfirm) {
			res.json({
				status : 0,
				data : {
					msg : "Passwords do not match"
				}
			});
		} else {
			db.changePassword({
				email : req.body.username,
				oldpassword : req.body.oldpassword,
				password : req.body.password,
				passwordconfirm : req.body.passwordconfirm
			}, function (err) {
				if (err) {
					res.json({
						status : 0,
						data : {
							msg : "Failed to change password"
						}
					});
				} else {
					res.json({
						status : 1,
						data : {
							msg : "Successfully changed password"
						}
					});
				}
			});
		}
	},

	// server.get('/logout', ...)
	logout : function (req, res, next) {
		req.logout();
		res.redirect('/');
	},

	// server.get('/account', ...
	account: function(req, res) {
		res.render('account', {
			title: 'Account',
			currentUser: req.user
		});
	}

};