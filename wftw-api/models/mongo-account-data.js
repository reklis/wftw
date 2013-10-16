var _ = require('underscore'),
	Account = require('./account'),
	crypto = require('crypto');

module.exports = {

	// Get a account by id
	get : function (id, cb) {
		Account.findById(id, function (err, account) {
			if (err) {
				console.log('Failed to get account: ' + err);
				cb(err);
			} else if (!account) {
				console.log('Failed to get account: Account not found');
				cb();
			} else {
				cb(null, account);
			}
		});
	},

	// Get all accounts
	getAll : function (cb) {
		Account.find({}, function (err, accounts) {
			if (err) {
				console.log('Failed to get all accounts: ' + err);
				cb(err);
			} else {
				cb(null, accounts);
			}
		});
	},

	// Add a new account
	add : function (obj, cb) {
		var salt = crypto.randomBytes(128).toString('base64'),
			account = new Account({
				username : obj.username,
				password : crypto.createHmac('sha1', salt).update(obj.password).digest('hex'),
				salt : salt,
				contactinfo : {
					firstname : obj.firstname,
					lastname : obj.lastname
				},
				profileurl : obj.profileurl
			});

		account.save(function(err, account) {
			if (err) {
				console.log('Failed to add an account: ' + err);
				cb(err);
			} else {
				cb(null, account);
			}
		});
	},

	// Authenticate account
	authenticate : function (username, password, cb) {
		Account.findOne({
			'username' : username
		}, function (err, account) {
			if (err) {
				console.log('Failed to authenticate: ' + err);
				cb(err);
			} else if (!account) {
				console.log('Failed to authenticate: Account not found');
				cb();
			} else {
				var encodedPassword = crypto.createHmac('sha1', account.salt).update(password).digest('hex');
				if (encodedPassword == account.password) {
					cb(null, account);
				} else {
					console.log('Failed to authenticate: Password does not match');
					cb();
				}
			}
		});
	},

	resetPassword : function (username, oldPassword, newPassword, cb) {
		Account.findOne({
			'username' : username
		}, function (err, account) {
			if (err) {
				cb(err);
			} else {
				if (!account) {
					cb();
				} else {
					var encodedPassword = crypto.createHmac('sha1', account.salt).update(oldPassword).digest('hex');
					if (encodedPassword == account.password) {
						var newSalt = crypto.randomBytes(128).toString('base64');
						var newEncodedPassword = crypto.createHmac('sha1', newSalt).update(newPassword).digest('hex');
						account.password = newEncodedPassword;
						account.salt = newSalt;
						account.save(function (err, account) {
							if (err) {
								console.log('Failed to save account: ' + err);
								cb(err);
							} else {
								cb(null, account);
							}
						});
					} else {
						console.log('Failed to authenticate user: password not valid');
						cb('Failed to authenticate user', null);
					}
				}
			}
		});
	},

	// Remove an account
	remove : function (id, cb) {
		Account.findByIdAndRemove(id, function (err, account) {
			if (err) {
				console.log('Failed to find account to remove: ' + err);
				cb(err);
			} else if (!account) {
				console.log('Failed to find account to remove: Account not found');
				cb();
			} else {
				cb(null, account);
			}
		});
	}

};
