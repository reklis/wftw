var config = require('../config'),
	restClient = require('./restClient'),
	client = new restClient(config.webConnectionInfo.url);

module.exports = {
	
	redirectBaseUrl: function (req, res, next) {
		res.redirect('/');
	},

	// server.get('/'...)
	index : function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/achome');
		} else {
			res.render('index', {
				currentUser: req.user
			});
		}
	},

	// server.get('/achome', ensureAuthenticated, ...
	achome: function (req, res, next) {
		res.render('achome', {
			currentUser: req.user
		});
	},

	vendors: function (req, res, next) {
		client.getVendors(function (err, vendors) {
			if (err) {
				console.log(err);
				vendors = [];
			}

			res.render('vendors', {
				currentUser: req.user,
				vendors: vendors
			});
		});
	},

	vendorregistration: function (req, res, next) {
		client.addVendor({
			businessname: req.body.businessname,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			description: req.body.description,
			requestedspacecount: req.body.requestedspacecount
		}, function (err, account) {
			if (err) {
				res.render('vendors/application', {
					validationerror: err.message,
					currentUser: req.user
				});
			} else {
				res.redirect('/vendors/applicationsuccess');
			}
		});
	}
};