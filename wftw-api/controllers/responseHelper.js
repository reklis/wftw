var _ = require('underscore');

module.exports = {
	okResponse : function (message, data) {
		return {
			code : 'OK',
			message : message,
			data : _.isUndefined(data) || _.isNull(data) ? {} : data
		};
	},
	response : function (code, message, data) {
		return {
			code : code,
			message : message,
			data : _.isUndefined(data) || _.isNull(data) ? {} : data
		};
	}
};