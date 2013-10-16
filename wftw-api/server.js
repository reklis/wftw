var _ = require('underscore'),
	config = require('./config'),
	colors = require('colors'),
	mongoose = require('mongoose'),
	restify = require('restify'),
	accessCount = 1;

var server = restify.createServer({
	//certificate: ...,	// If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
	//key: ...,			// If you want to create an HTTPS server, pass in the PEM-encoded certificate and key
	name : config.web.serverName,
	version : config.version
});
server.use(function(req, res,next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	return next();
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(function logRequest(req, res, next) {
	console.log('Access: '.yellow + '#'.grey + colors.grey(accessCount++) + ' | ' + 'IP: '.yellow + colors.grey(req.connection.remoteAddress) + ' | ' + 'Time: '.yellow + colors.grey(Date.now()));
	console.log('Url: '.yellow + colors.green(req.method) + ' ' + colors.grey(req.url));
	if (!_.isUndefined(req.headers) && !_.isNull(req.headers) && !_.isEmpty(req.headers)) {
		console.log('Headers: '.yellow + '%j'.grey, req.headers);
	}
	if (!_.isUndefined(req.params) && !_.isNull(req.params) && !_.isEmpty(req.params)) {
		console.log('Params: '.yellow + '%j'.grey, req.params);
	}
	if (!_.isUndefined(req.body) && !_.isNull(req.body) && !_.isEmpty(_.object(req.body))) {
		console.log('Body: '.yellow + '%j'.grey, req.body);
	}
	if (!_.isUndefined(req.authorization) && !_.isNull(req.authorization)) {
		console.log('Auth: '.yellow + '%j'.grey, req.authorization);
	}
	return next();
});
server.use(restify.throttle({
	burst : 100,
	rate : 50,
	ip : true,
	overrides : {}
}));

require('./routes')(server);

server.listen(config.web.port, function() {
	console.log(colors.cyan('_________________________________________________'));
	console.log(colors.cyan('Starting ' + config.web.name + ' v' + config.version + '...'));
	console.log(colors.cyan(config.web.name + ' v' + config.version + ' listening on port ' + server.url));
	console.log(colors.cyan('_________________________________________________'));
	mongoose.set('debug', config.connectionInfo.db.debug);
	mongoose.connect(config.connectionInfo.db.connectionString);
});
