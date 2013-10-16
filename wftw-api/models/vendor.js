var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	VendorSchema = new Schema({
		businessname: String,
		firstname: String,
		lastname: String,
		email: String,
		phone: String,
		description: String,
		requestedspacecount: Number,
		amountperspace: Number,
		total: Number,
		eventyear: Number,
		modified: {
			type: Date,
			default : Date.now
		},
		created: {
			type: Date,
			default : Date.now
		}
	});

VendorSchema.pre('save', function (next) {
	this.modified = new Date();
	if (this.created === undefined || this.created === null) {
		this.created = new Date();
	}
	if (this.requestedspacecount && this.amountperspace) {
		this.total = (this.amountperspace * this.requestedspacecount);
	}
	next();
});

module.exports = mongoose.model('Vendor', VendorSchema);