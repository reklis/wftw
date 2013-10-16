var _ = require('underscore'),
	db = require('../models/mongo-account-data'),
	emailAddressRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
	responseHelper = require('./responseHelper'),
	restify = require('restify');

module.exports = {

	// app.get('/api/accounts/:id', ...
	get : function (req, res, next) {
		if (_.isUndefined(req.params.id) || _.isNull(req.params.id)) {
			next(new restify.InvalidArgumentError('Invalid id'));
		} else {
			db.get(req.params.id, function (err, account) {
				if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
					next(new restify.InternalError('Failed to get account with id: ' + req.params.id));
				} else if (!_.isUndefined(account) && !_.isNull(account)) { // Success condition
					res.json(responseHelper.okResponse('Successfuly got account with id: ' + req.params.id, {
						account : account
					}));
				} else { // Not found condition
					next(new restify.ResourceNotFoundError('Failed to get account with id: ' + req.params.id));
				}
			});
		}
	},

	// app.get('/api/accounts', ...
	getAll : function (req, res, next) {
		db.getAll(function (err, accounts) {
			if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
				next(new restify.InternalError('Failed to get all accounts'));
			} else { // Success condition
				res.json(responseHelper.okResponse('Successfully got all accounts', {
					accounts : accounts
				}));
			}
		});
	},

	// app.post('/api/accounts/:username', ...
	add : function (req, res, next) {
		if (_.isUndefined(req.params.username) || _.isNull(req.params.username) || req.params.username.length === 0 || !emailAddressRegex.test(req.params.username)) {
			next(new restify.InvalidArgumentError('Invalid email'));
		} else if (_.isUndefined(req.params.newpassword1) || _.isNull(req.params.newpassword1)) {
			next(new restify.InvalidArgumentError('Invalid password1'));
		} else if (_.isUndefined(req.params.newpassword2) || _.isNull(req.params.newpassword2)) {
			next(new restify.InvalidArgumentError('Invalid password2'));
		} else if (req.params.newpassword1 != req.params.newpassword2) {
			next(new restify.InvalidArgumentError('Passwords do not match'));
		} else if (_.isUndefined(req.params.accesskey) || _.isNull(req.params.accesskey) || req.params.accesskey != 'help4me') {
			next(new restify.InvalidArgumentError('Invalid access key'));
		} else {
			db.add(req.params.username, req.params.newpassword1, req.params.accesskey, req.params.firstname, req.params.lastname, req.params.deviceid, req.params.profileurl, function (err, account) {
				if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
					next(new restify.InternalError('Failed to add account'));
				} else { // Success condition
					res.json(responseHelper.okResponse('Successfully added account', {
						account : account
					}));
				}
			});
		}
	},

	// app.get('/api/accounts/:username/auth/:password', ...
	authenticate : function (req, res, next) {
		if (_.isUndefined(req.params.username) || _.isNull(req.params.username)) {
			next(new restify.InvalidArgumentError('Invalid username'));
		} else if (_.isUndefined(req.params.password) || _.isNull(req.params.password)) {
			next(new restify.InvalidArgumentError('Invalid password'));
		} else {
			db.authenticate(req.params.username, req.params.password, function (err, account) {
				if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
					next(new restify.InternalError('Failed to authenticate account'));
				} else if (!_.isUndefined(account) && !_.isNull(account)) { // Success condition
					res.json(responseHelper.okResponse('Successfully authenticated account', {
						account : account
					}));
				} else { // Not found condition
					next(new restify.ResourceNotFoundError('Failed to authenticate account with username: %j', req.params.username));
				}
			});
		}
	},

	// app.post('/api/accounts/:username/resetpassword', ...
	resetPassword : function (req, res, next) {
		if (_.isUndefined(req.params.username) || _.isNull(req.params.username)) {
			next(new restify.InvalidArgumentError('Invalid username'));
		} else if (_.isUndefined(req.params.oldpassword) || _.isNull(req.params.oldpassword)) {
			next(new restify.InvalidArgumentError('Invalid old password'));
		} else if (_.isUndefined(req.params.newpassword1) || _.isNull(req.params.newpassword1)) {
			next(new restify.InvalidArgumentError('Invalid password1'));
		} else if (_.isUndefined(req.params.newpassword2) || _.isNull(req.params.newpassword2)) {
			next(new restify.InvalidArgumentError('Invalid password2'));
		} else if (req.params.newpassword1 != req.params.newpassword2) {
			next(new restify.InvalidArgumentError('Passwords do not match'));
		} else {
			db.resetPassword(req.params.username, req.params.oldpassword, req.params.newpassword1, function (err, success) {
				if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
					next(new restify.InternalError('Failed to reset password for username: %j', req.params.username));
				} else if (!_.isUndefined(success) && !_.isNull(success)) { // Success condition
					res.json(responseHelper.okResponse('Successfully reset password for username: %j', req.params.username, {
						success : success
					}));
				} else { // Not found condition
					next(new restify.ResourceNotFoundError('Failed to reset password for username: %j', req.params.username));
				}
			});
		}
	},

	// app.delete('/api/accounts/:id', ...
	remove : function (req, res, next) {
		if (_.isUndefined(req.params.id) || _.isNull(req.params.id)) {
			next(new restify.InvalidArgumentError('Invalid account id'));
		} else {
			db.remove(req.params.id, function (err, account) {
				if (!_.isUndefined(err) && !_.isNull(err)) { // Error condition
					next(new restify.InternalError('Failed to remove account with id: %j', req.params.id));
				} else if (!_.isUndefined(account) && !_.isNull(account)) { // Success condition
					res.json(responseHelper.okResponse('Successfully removed account with id: %j' + req.params.id, {
						account : account
					}));
				} else { // Not found condition
					next(new restify.ResourceNotFoundError('Failed to remove account with id: %j', req.params.id));
				}
			});
		}
	}

}