// Initial server config
var config = require('./config'),
	express = require('express'),
	httpProxy = require('http-proxy'),
	server = express(),
	proxyAccessCount = 1;

function logProxyAccess(method, requestURL, proxyURL) {
	console.log('Proxying: ' + method + ' \'' + requestURL + '\' -> \'' + proxyURL + '\'');
}

var proxy = new httpProxy.RoutingProxy({
	enable : {
		xforward : true
	}
});

// Proxy to api
server.all('/api', function(req, res, next) {
	logProxyAccess(req.method, req.originalUrl, req.protocol + '://' + config.web.api.host + ':' + config.web.api.port + req.url);
	proxy.proxyRequest(req, res, config.web.api);
});
server.all('/api/*', function(req, res, next) {
	logProxyAccess(req.method, req.originalUrl, req.protocol + '://' + config.web.api.host + ':' + config.web.api.port + req.url);
	proxy.proxyRequest(req, res, config.web.api);
});
// Proxy to main site
server.all('*', function(req, res) {
	logProxyAccess(req.method, req.originalUrl, req.protocol + '://' + config.web.web.host + ':' + config.web.web.port + req.url);
	proxy.proxyRequest(req, res, config.web.web);
})

// ERROR HANDLING
function NotFound(msg) {
	this.name = 'NotFound'
	Error.call(this,msg)
	Error.captureStackTrace(this,arguments.callee)
}

NotFound.prototype.__proto__ = Error.prototype;

server.use(function(err, req, res, next) {
	if (err instanceof NotFound) {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write(req.url + ' Not Found\n' + JSON.stringify(req.headers, true, 2));
	} else {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
	}
	res.end();
})

server.listen(config.web.port, function() {
	console.log('\x1b[36m _________________________________________________');
	console.log('\x1b[36m Starting ' + config.web.name + ' ' + config.version + '...');
	console.log('\x1b[36m ' + config.web.name + ' ' + config.version + ' listening on port ' + config.web.port);
});