var config = require('../config'),
	restClient = require('./restClient'),
	client = new restClient(config.webConnectionInfo.url),
	fs = require('fs'),
	path = require('path');

module.exports = {
	
	redirectBaseUrl: function (req, res, next) {
		res.redirect('/');
	},

	// server.get('/'...)
	index : function (req, res, next) {
		res.render('index');
	},

	eventvendors: function (req, res, next) {
		var images = [];

		fs.readdir(path.join(__dirname, '../static/wftw/images/2013/vendors'), function(err, files) {
			if (err) { 
				console.log('Error getting list of vendor logos: %j', err);
			} else {
				for (var i=0, len=files.length; i<len; i++) {
					// check to see if the file is a directory
					if (files[i].indexOf('.')) {
						images.push({
							alt: files[i].split('.')[0],
							path: files[i]
						});
					}				
				}
			}
			return res.render('2013/vendors', {images:images});
		});
	},

	vendors: function (req, res, next) {
		var vendors = [];
		client.getVendors(function (err, vendors) {
			if (err) {
				console.log(err);
			} else {
				vendors = vendors;
			}
			
			res.render('vendors', {vendors:vendors});
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
				req.locals.validationerror = err.message;
				res.render('vendors/application');
			} else {
				res.redirect('/vendors/applicationsuccess');
			}
		});
	}
};