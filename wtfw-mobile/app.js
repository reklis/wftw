/*global require, __dirname, process, console */

(function () {
  'use strict';

  var
    http = require('http'),
    path = require('path'),
    express = require('express'),
    config = require('./config'),
    routes = require('./routes'),
    auth = express.basicAuth('admin', 'password'),
    app = express()
  ;

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(express.errorHandler());

  routes.init(config);

  app.get('/', auth, routes.index);
  app.get('/vendors', auth, routes.vendors);
  app.post('/updatecontributions', auth, routes.updatecontributions);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

}());
