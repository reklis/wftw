var _ = require('underscore'),
	accessCount = 1,
	config = require('./config'),
	cons = require('consolidate'),
	express = require('express'),
	restClient = require('./modules/restClient'),
	LocalStrategy = require('passport-local').Strategy,
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(express),
	passport = require('passport'),
	client = new restClient(config.webConnectionInfo.url),
	server = express();

// ERROR HANDLING
function NotFound(msg) {
	this.name = 'NotFound';
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

server.use(function(err, req, res, next) {
	if (err instanceof NotFound) {
		res.render('error.html')
	} else {
		res.render('error.html')
	}
});

// Define local strategy for Passport
passport.use(new LocalStrategy(function (username, password, next) {
	client.authenticateAccount(username, password, function (err, account) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			console.log(err);
			next(null, null);
		} else {
			return next(err, account);
		}
	});
}));

// serialize account on login
passport.serializeUser(function (account, next) {
	next(null, account._id);
});

// deserialize account on logout
passport.deserializeUser(function (id, next) {
	client.getAccount(id, function (err, account) {
		if (!_.isUndefined(err) && !_.isNull(err)) {
			console.log(err);
			return next(null, null);
		} else {
			return next(err, account);
		}
	});
});

server.locals._ = _;
server.configure(function () {
	server.engine('html', cons.ejs);
	server.set('view engine', 'html');
	server.set('views', __dirname + '/views');
	server.use("/static", express.static(__dirname + '/static'));
	server.use(express.bodyParser());
	server.use(express.cookieParser());
	server.use(express.session({
			secret : config.connectionInfo.secret,
			maxAge : new Date(Date.now() + 3600000),
			store : new MongoStore({
				url : config.connectionInfo.db.connectionString
			})
		}));
	server.use(passport.initialize());
	server.use(passport.session());
	server.use(function logAccess(req, res, next) {
		console.log('Access #' + accessCount++ + ' from IP ' + req.connection.remoteAddress + ' at TIME ' + Date.now());
		console.log('Url: ' + req.method + ' ' + req.url);
		if (!_.isUndefined(req.params) && !_.isNull(req.params) && req.params != {}) {
			console.log('Params: %j', req.params);
		}
		if (!_.isUndefined(req.body) && !_.isNull(req.body) && req.body != {}) {
			console.log('Body: %j', req.body);
		}
		if (!_.isUndefined(req.authorization) && !_.isNull(req.authorization) && req.authorization != {}) {
			console.log('Auth: %j', req.authorization);
		}
		return next();
	});
	server.use(server.router);
});

require('./routes')(server);

server.listen(config.web.port, function () {
	console.log('\x1b[36m _________________________________________________');
	console.log('\x1b[36m Starting ' + config.web.name + ' ' + config.version + '...');
	console.log('\x1b[36m ' + config.web.name + ' ' + config.version + ' listening on port ' + config.web.port);
	mongoose.set('debug', config.connectionInfo.db.debug);
	mongoose.connect(config.connectionInfo.db.connectionString);
});