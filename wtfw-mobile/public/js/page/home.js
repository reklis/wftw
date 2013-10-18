/*global $, Handlebars, JST, console */

(function () {
  'use strict';

  var vendors, vendor_template;

  Handlebars.registerHelper('formatPercentage', function (percentvalue) {
    return ~~(percentvalue * 100) + '%';
  });

  function findVendorById (id) {
    if (!vendors || !vendors.length) {
      return;
    }
    
    var filtered = vendors.filter(function (v) {
      return (v._id === id);
    });

    if (!filtered || !filtered.length) {
      return;
    }

    return filtered[0];
  }

  function showEditVendorModal () {
    return function () {
      var
        vendorid = $(this).data('vendorid'),
        v = findVendorById(vendorid)
      ;

      if (!v) {
        return;
      }

      $('#editVendorModal .btn-primary').data('vendorid', vendorid);
      $('#editVendorModal #contributionpercentage').val(v.contributionpercentage*100);
      $('#editVendorModal #totalsales').val(v.totalsales);
      $('#editVendorModal').modal('show');
    };
  }

  function hideEditVendorModal () {
    $("#editVendorModal").modal('hide');
  }

  function saveVendorModal () {
    return function () {
      var
        vendorid = $(this).data('vendorid'),
        v = findVendorById(vendorid),
        totalsales = parseFloat($('#editVendorModal #totalsales').val()),
        contributionpercentage = parseFloat($('#editVendorModal #contributionpercentage').val())
      ;

      updateVendor(v, totalsales, contributionpercentage/100);
    };
  }

  function listVendors () {
    $.ajax({ url: '/vendors' })
    .done(function( data ) {
      vendors = data;

      $('.vendorlist').html(vendor_template({
        vendors: vendors
      }));

      $('.change-totalsales').on('click', showEditVendorModal());
      $('.change-percentage').on('click', showEditVendorModal());

      $('.add-1').on('click', add(1));
      $('.add-10').on('click', add(10));
      $('.add-100').on('click', add(100));

      $('.loading')
        .removeClass('loading')
        .addClass('ready');
    });
  }

  function updateVendor (v, totalsales, contributionpercentage) {
    if (!v) {
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/updatecontributions',
      data: {
        vendorid: v._id,
        contributionpercentage: contributionpercentage,
        totalsales: totalsales
      }
    })
      .always(function (result) {
        console.log(result);
        hideEditVendorModal();
        listVendors();
      })
    ;
  }

  function add (amount) {
    return function () {
      var
        vendorid = $(this).data('vendorid'),
        vendor = findVendorById(vendorid)
      ;

      updateVendor(
        vendor,
        parseFloat(amount) + parseFloat(vendor.totalsales)
      );
    };
  }

  $(function () {
    vendor_template = JST['handlebars/vendor.handlebars'];

    $('#editVendorModal .btn-primary').on('click', saveVendorModal());

    listVendors();
  });

}());