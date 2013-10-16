var config = {
	environment : 'development',
	version : 'v1.0.0',
	web : {
		port : process.env.WEB_PORT || 80,
		name : 'WFTW-GATEWAY',
		api : {
			host: '127.0.0.1',	// host to forward to
			port: 4243,			// port to forward to
			path: '/api/'		// path to forward to
		},
		web : {
			host: '127.0.0.1',	// host to forward to
			port: 4242			// port to forward to
		}
	}
};

module.exports = config;
