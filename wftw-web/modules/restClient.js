var _ = require('underscore'),
	restify = require('restify');

var restClient = function (url) {
	this.url = url;
	this.jsonClient = restify.createJsonClient({
		url : url,
		version : '*'
	});
};

restClient.prototype.getAccount = function (accountId, cb) {
	this.jsonClient.get('/api/accounts/' + accountId, function (err, req, res, obj) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			cb(err, null);
		} else if (!_.isUndefined(obj) && !_.isNull(obj)) {
			if (obj.code === 'OK') {
				cb(null, obj.data.account);
			} else {
				cb(obj.message, null);
			}
		} else {
			cb('Failed to get account', null);
		}
	});
};

restClient.prototype.addAccount = function (username, newpassword1, newpassword2, firstname, lastname, cb) {
	this.jsonClient.put('/api/accounts', {
		username : username,
		newpassword1 : newpassword1,
		newpassword2 : newpassword2,
		firstname : firstname,
		lastname : lastname
	}, function (err, req, res, obj) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			cb(err, null);
		} else if (!_.isUndefined(obj) && !_.isNull(obj)) {
			if (obj.code === 'OK') {
				cb(null, obj.data.account);
			} else {
				cb(obj.message, null);
			}
		} else {
			cb('Failed to add account', null);
		}
	});
};

restClient.prototype.authenticateAccount = function (username, password, cb) {
	this.jsonClient.get('/api/accounts/' + encodeURIComponent(username) + '/auth/' + encodeURIComponent(password), function (err, req, res, obj) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			cb(err, null);
		} else if (!_.isUndefined(obj) && !_.isNull(obj)) {
			if (obj.code === 'OK') {
				cb(null, obj.data.account);
			} else {
				cb(obj.message, null);
			}
		} else {
			cb('Failed to authenticate', null);
		}
	});
};

restClient.prototype.addVendor = function (obj, cb) {
	this.jsonClient.put('/api/vendors', obj, function (err, req, res, obj) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			return cb(err, null);
		} else if (!_.isUndefined(obj) && !_.isNull(obj)) {
			if (obj.code === 'OK') {
				return cb(null, obj.data);
			} else {
				return cb(obj.message, null);
			}
		} else {
			cb('Failed to add vendor', null);
		}
	});
};

restClient.prototype.getVendors = function (cb) {
	this.jsonClient.get('/api/vendors', function (err, req, res, obj) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			return cb(err, null);
		} else if (!_.isUndefined(obj) && !_.isNull(obj)) {
			if (obj.code === 'OK') {
				return cb(null, obj.data);
			} else {
				return cb(obj.message, null);
			}
		} else {
			cb('Failed to get all vendors', null);
		}
	});
};

module.exports = restClient;