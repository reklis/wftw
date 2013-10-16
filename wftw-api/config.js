var config = {
	environment : 'development',
	version : 'v1.0.0',
	connectionInfo : {
		db : {
			connectionString : 'mongodb://localhost:/wftw',
			debug : true
		},
		secret : '1769e11d73b910af25ea2124b1e433b6'
	},
	notifications: 'seh1082@yahoo.com',
	redis : {
		uri : process.env.DUOSTACK_DB_REDIS,
		host : 'localhost',
		port : 6379
	},
	web : {
		port : process.env.WEB_PORT || 4243,
		name : 'WFTW-REST-API'
	}
};

module.exports = config;