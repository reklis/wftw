/*global require, exports */

(function () {
  'use strict';

  exports.web = function (req, res) {
    res.render('results', { chrome: true });
  };

  exports.big = function (req, res) {
    res.render('results', { chrome: false });
  };

}());