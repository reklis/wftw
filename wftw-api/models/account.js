var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ContactInfoSchema = new Schema({
		firstname: String,
		lastname: String,
		email: String,
		dob: Date,
		homephone: String,
		mobilephone: String,
		address: {
			address1: String,
			address2: String,
			city: String,
			stateprovince: String,
			postalcode: String,
			country: String
		},
		modified: {
			type: Date,
			default: Date.now
		},
		created: {
			type: Date,
			default: Date.now
		}
	}),
	AccountSchema = new Schema({
		username: {
			type: String,
			required: true,
			index: {
				unique: true,
				dropDups: true
			}
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		salt: {
			type: String,
			required: true,
			select: false
		},
		passwordresetlink: {
			type: String,
			select: false
		},
		passwordresetlinkexpires: {
			type: Date,
			select: false
		},
		type : {
			type : Number,
			required : true,
			default : 99
		},
		contactinfo: [ContactInfoSchema],
		profileurl: String,
		modified: {
			type: Date,
			default: Date.now
		},
		created: {
			type: Date,
			default: Date.now
		}
	});

AccountSchema.pre('save', function (next) {
	this.modified = new Date();
	if (this.created === undefined || this.created === null) {
		this.created = new Date();
	}
	next();
});

ContactInfoSchema.pre('save', function (next) {
	this.modified = new Date();
	if (this.created === undefined || this.created === null) {
		this.created = new Date();
	}
	next();
});

module.exports = mongoose.model('Account', AccountSchema);