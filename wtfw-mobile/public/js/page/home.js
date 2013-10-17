/*global $, JST */

(function () {
  'use strict';

  $(function () {

    var
      vendor = {
        name: 'vendor name',
        description: 'vendor description'
      },
      vendor_template = JST['handlebars/vendor.handlebars']
    ;

    $('.loading').text('ready')
      .removeClass('loading')
      .addClass('ready');

    $('.vendor').html(vendor_template(vendor));

  });

}());