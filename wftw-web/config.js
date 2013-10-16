var config = {
	environment : 'development',
	version : 'v1.0.0',
	connectionInfo : {
		db : {
			connectionString : 'mongodb://localhost:/wftw',
			debug : true
		},
		secret : '1769e6ad63aa14af25eb212418e433b6'
	},
	webConnectionInfo : {
		url : 'http://localhost/api'
	},
	web : {
		port : process.env.WEB_PORT || 4242,
		name : 'WFTW-WEB'
	}
};

module.exports = config;