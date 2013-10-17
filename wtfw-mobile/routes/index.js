/*global exports */

(function () {
  'use strict';

  var config = {};

  exports.settings = function (c) {
    config = c;
    return config;
  };

  exports.index = function(req, res){
    res.render('index', { config: config });
  };
    
}());

