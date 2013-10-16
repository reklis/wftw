var _ = require('underscore'),
	config = require('../config'),
	db = require('../models/mongo-vendor-data'),
	fs = require('fs'),
	mandrill = require('node-mandrill')('veieGeiDRIWb7OOry8vGag'),
	responseHelper = require('./responseHelper'),
	restify = require('restify'),
	ControllerCRUD = require('./controller-crud'),
	VendorControllerCRUD = new ControllerCRUD('vendor');

function vendorValidator(obj) {
	if (!obj.businessname) {
		return 'Invalid business name';
	} else if (!obj.firstname) {
		return 'Invalid first name';
	} else if (!obj.lastname) {
		return 'Invalid last name';
	} else if (!obj.email) {
		return 'Invalid email';
	} else if (!obj.phone) {
		return 'Invalid phone';
	} else if (!obj.description) {
		return 'Invalid description';
	} else if (!obj.requestedspacecount || obj.requestedspacecount <= 0) {
		return 'Invalid number of requested spaces';
	} else {
		return null;
	}
}

function getSignupEmailText(v) {
	var contents = fs.readFileSync('./controllers/templates/vendorregistrationsuccess.html').toString();
	v.amountperspace = v.amountperspace.toFixed(2);
	v.total = v.total.toFixed(2);
	v.subject = 'Vendor Registration Success';
	v.name = v.firstname + ' ' + v.lastname;
	return _.template(contents, v);
}

function getNotificationEmailText(v) {
	var contents = fs.readFileSync('./controllers/templates/newvendorregistration.html').toString();
	v.amountperspace = v.amountperspace.toFixed(2);
	v.total = v.total.toFixed(2);
	v.subject = 'New Vendor Registration';
	v.name = v.firstname + ' ' + v.lastname;
	return _.template(contents, v);
}

exports.get = function (req, res, next) {
	VendorControllerCRUD.get(req.params.id, function (ret) {
		if (typeof ret == restify.InternalError || typeof ret == restify.InvalidArgumentError || typeof ret == restify.ResourceNotFoundError) {
			return next(ret);
		} else {
			return res.json(ret);
		}
	});
}

exports.getAll = function (req, res, next) {
	VendorControllerCRUD.getAll(function (ret) {
		if (typeof ret == restify.InternalError || typeof ret == restify.InvalidArgumentError || typeof ret == restify.ResourceNotFoundError) {
			return next(ret);
		} else {
			return res.json(ret);
		}
	});
}

exports.add = function (req, res, next) {
	VendorControllerCRUD.add({
		businessname: req.params.businessname,
		firstname: req.params.firstname,
		lastname: req.params.lastname,
		email: req.params.email,
		phone: req.params.phone,
		description: req.params.description,
		requestedspacecount: parseInt(req.params.requestedspacecount, 10),
		amountperspace: 20
	}, vendorValidator, function (ret) {
		if (typeof ret == restify.InternalError || typeof ret == restify.InvalidArgumentError || typeof ret == restify.ResourceNotFoundError) {
			return next(ret);
		} else {
			mandrill('/messages/send', {
				message: {
					to: [{
						email: req.params.email,
						name: req.params.firstname + ' ' + req.params.lastname
					}],
					from_email: 'vendorsignup@waterftw.org',
					from_name: "Water for the World",
					subject: 'WaterFTW | Vendor Registration',
					google_analytics_domains: ['waterftw.org', 'waterftw.com', 'waterwtf.com'],
					google_analytics_campaign: 'message.vendorsignup@waterftw.org',
					html: getSignupEmailText(ret.data)
				}
			}, function(err, response) {
				if (err) {
					console.log(JSON.stringify(err));
				}
			});
			mandrill('/messages/send', {
				message: {
					to: [{
						email: config.notifications,
						name: 'WaterFTW'
					}],
					from_email: 'vendorsignup@waterftw.org',
					from_name: "Water for the World",
					subject: 'WaterFTW | New Vendor Registration',
					html: getNotificationEmailText(ret.data)
				}
			}, function(err, response) {
				if (err) {
					console.log(JSON.stringify(err));
				}
			});
			return res.json(ret);
		}
	});
}

exports.update = function (req, res, next) {
	VendorControllerCRUD.update(req.params.id, {
		businessname: req.params.businessname,
		firstname: req.params.firstname,
		lastname: req.params.lastname,
		email: req.params.email,
		phone: req.params.phone,
		description: req.params.description,
		requestedspacecount: parseInt(req.params.requestedspacecount, 10),
		amountperspace: 20
	}, vendorValidator, function (ret) {
		if (typeof ret == restify.InternalError || typeof ret == restify.InvalidArgumentError || typeof ret == restify.ResourceNotFoundError) {
			return next(ret);
		} else {
			return res.json(ret);
		}
	});
}

exports.remove = function (req, res, next) {
	VendorControllerCRUD.remove(req.params.id, function (ret) {
		if (typeof ret == restify.InternalError || typeof ret == restify.InvalidArgumentError || typeof ret == restify.ResourceNotFoundError) {
			return next(ret);
		} else {
			return res.json(ret);
		}
	});
}