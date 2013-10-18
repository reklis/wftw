/*global require, exports, console */

(function () {
  'use strict';

  var
    restify = require('restify'),
    config, json_client
  ;

  exports.init = function (c) {
    config = c;

    json_client = restify.createJsonClient({
      url: config.api_root,
      version : '*'
    });

    return config;
  };

  exports.index = function(req, res) {
    res.render('index', { config: config });
  };

  exports.vendors = function (req, res) {

    json_client.get('/api/vendors', function (err, req2, res2, obj) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      } else if (!obj || !obj.data) {
        res.status(400).json({ error: 'no vendor data' });
      } else {
        res.status(200).json(obj.data);
      }
    });

  };

  exports.updatecontributions = function (req, res) {
    var vendor_update_req = {
      id: req.param('vendorid'),
      contributionpercentage: req.param('contributionpercentage'),
      totalsales: req.param('totalsales')
    };

    if (!vendor_update_req.id) {
      return res.status(400).json({ error: 'invalid vendorid parameter'});
    }

    if (undefined === typeof vendor_update_req.totalsales) {
      return res.status(400).json({ error: 'missing totalsales parameter' });
    }

    json_client.post('/api/vendors/' + vendor_update_req.id + '/contributions',
      vendor_update_req,
      function (err, req2, res2, obj) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json(obj.data);
        }
      }
    );

  };

}());

