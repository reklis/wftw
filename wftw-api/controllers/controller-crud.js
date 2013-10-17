/*global require, module */

var
	responseHelper = require('./responseHelper'),
	restify = require('restify'),
	db = null,
	entityname = 'entity'
;

function ControllerCRUD(name) {
	db = require('../models/mongo-' + name + '-data');
	entityname = name;
}

ControllerCRUD.prototype.model = function () {
	return db;
};

ControllerCRUD.prototype.validate = function (obj, validator, cb) {
	var validationmessage = validator(obj);

	if (validationmessage !== null) {
		console.log(validationmessage);
		return cb(new restify.InvalidArgumentError(validationmessage));
	} else {
		return cb();
	}
};

// class methods
ControllerCRUD.prototype.get = function (id, cb) {
	if (!id) {
		cb(new restify.InvalidArgumentError('Invalid id'));
	} else {
		db.get(id, function (err, entity) {
			if (err) { // Error condition
				cb(new restify.InternalError('Failed to get ' + entityname + ' with id: '+ id));
			} else if (entity) { // Success condition
				cb(responseHelper.okResponse('Successfuly got ' + entityname + ' with id: ' + id, entity));
			} else { // Not found condition
				cb(new restify.ResourceNotFoundError('Failed to get ' + entityname + ' with id: ' + id));
			}
		});
	}
};

ControllerCRUD.prototype.getAll = function (cb) {
	db.getAll(function (err, entities) {
		if (err) { // Error condition
			cb(new restify.InternalError('Failed to get all ' + entityname + 's'));
		} else { // Success condition
			cb(responseHelper.okResponse('Successfuly got all ' + entityname + 's', entities));
		}
	});
};

ControllerCRUD.prototype.add = function(obj, validator, cb) {
	var validationmessage = validator(obj);

	if (validationmessage !== null) {
		return cb(new restify.InvalidArgumentError(validationmessage));
	} else {
		db.add(obj, function (err, entity) {
			if (err) { // Error condition
				cb(new restify.InternalError('Failed to add ' + entityname));
			} else { // Success condition
				cb(responseHelper.okResponse('Successfuly added ' + entityname, entity));
			}
		});
	}
};

ControllerCRUD.prototype.update = function(id, obj, validator, cb) {
	var validationmessage = validator(obj);

	if (!id) {
		cb(new restify.InvalidArgumentError('Invalid id'));
	} else if (validationmessage !== null) {
		return cb(new restify.InvalidArgumentError(validationmessage));
	} else {
		obj.id = id;
		db.update(obj, function(err, entity) {
			if (err) { // Error condition
				cb(new restify.InternalError('Failed to update ' + entityname + ' with id: ' + id));
			} else { // Success condition
				cb(responseHelper.okResponse('Successfuly updated ' + entityname + 'with id: ' + id, entity));
			}
		});
	}
};

ControllerCRUD.prototype.remove = function (id, cb) {
	if (!id) {
		cb(new restify.InvalidArgumentError('Invalid id'));
	} else {
		db.remove(id, function (err, entity) {
			if (err) { // Error condition
				cb(new restify.InternalError('Failed to remove ' + entityname + ' with id: ' + id));
			} else if (entity) { // Success condition
				cb(responseHelper.okResponse('Successfuly removed ' + entityname + ' with id: ' + id, entity));
			} else { // Not found condition
				cb(new restify.ResourceNotFoundError('Failed to remove ' + entityname + ' with id: ', id));
			}
		});
	}
};

module.exports = ControllerCRUD;