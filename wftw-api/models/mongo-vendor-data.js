var _ = require('underscore'),
	Vendor = require('./vendor');

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

}