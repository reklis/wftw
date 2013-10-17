/*global require, module, console */

var
	mongoose = require('mongoose'),
	Vendor = require('./vendor')
;

module.exports = {

	// Get vendor by id
	get: function (id, cb) {
		Vendor.findById(id, function (err, vendor) {
			if (err) {
				console.log('Failed to get vendor: ' + err);
				cb(err);
			} else if (!vendor) {
				console.log('Failed to get vendor: Vendor not found');
				cb();
			} else {
				cb(null, vendor);
			}
		});
	},

	// Get all vendors
	getAll: function (cb) {
		Vendor.find({}, function (err, vendors) {
			if (err) {
				console.log('Failed to get all vendors: ' + err);
				cb(err);
			} else {
				cb(null, vendors);
			}
		});
	},

	// Add a new vendor
	add : function (obj, cb) {
		var vendor = new Vendor({
			businessname: obj.businessname,
			firstname: obj.firstname,
			lastname: obj.lastname,
			email: obj.email,
			phone: obj.phone,
			description: obj.description,
			requestedspacecount: obj.requestedspacecount,
			amountperspace: 20,
			eventyear: 2013
		});

		vendor.save(function(err, vendor) {
			if (err) {
				console.log('Failed to add an vendor: ' + err);
				cb(err);
			} else {
				cb(null, vendor);
			}
		});
	},

	// Update an existing vendor
	update: function (obj, cb) {
		Vendor.findById(obj.id, function (err, vendor) {
			if (err) {
				cb(err);
			} else {
				vendor.businessname = obj.businessname;
				vendor.firstname = obj.firstname;
				vendor.lastname = obj.lastname;
				vendor.email = obj.email;
				vendor.phone = obj.phone;
				vendor.description = obj.description;
				vendor.requestedspacecount = obj.requestedspacecount;
				vendor.amountperspace = obj.amountperspace;

				vendor.save(function (err, vendor) {
					if (err) {
						console.log('Failed to update vendor: ' + err);
						cb(err);
					} else {
						cb(null, vendor);
					}
				});
			}
		});
	},

	updateContributions: function (obj, cb) {
		console.log(obj);

		Vendor.findById(
			new mongoose.Types.ObjectId(obj.id),
			function (find_error, vendor) {
				if (find_error) {
					console.error(find_error);
					cb(find_error);
				} else {
					if (!vendor) {
						cb(new Error('vendor not found: ' + obj.id));
					} else {

						if ('undefined' !== typeof(obj.contributionpercentage)) {
							vendor.contributionpercentage = obj.contributionpercentage;
						}

						vendor.totalsales = obj.totalsales;

						vendor.save(function (save_error, save_result) {
							if (save_error) {
								console.error('Failed to update vendor contributions');
								cb(save_error);
							} else {
								console.log(save_result);
								cb(null, save_result);
							}
						});

					}
				}
			}
		);
	},

	// Remove a vendor
	remove: function (id, cb) {
		Vendor.findByIdAndRemove(id, function (err, vendor) {
			if (err) {
				console.log('Failed to remove vendor: ' + err);
				cb(err);
			} else if (!vendor) {
				console.log('Failed to find vendor to remove: Vendor not found');
				cb();
			} else {
				cb(null, vendor);
			}
		});
	}

};