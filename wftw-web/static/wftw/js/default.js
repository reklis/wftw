function executeComparer(id, name) {
	$.ajax({
		url : '/api/comparer/execute',
		type: 'GET',
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'bangTidy',
					closable : false,
					message : {
						text : 'The comparer is now executing'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 2000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The comparer is failed to execute'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 2000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'The comparer is failed to execute'
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 2000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function addFactor() {
	$.ajax({
		url : '/api/factors',
		type: 'PUT',
		data : $('#factorForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				$('#factorForm')[0].reset();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to add the factor: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function editFactor(factorid) {
	$.ajax({
		url : '/api/factors/' + factorid,
		type: 'POST',
		data : $('#factorForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to update the factor: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function removeFactor(factorid) {
	$.ajax({
		url : '/acc/factor/' + factorid,
		type: 'DELETE',
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been removed'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				window.location = '/acc/factors';
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be removed'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to remove the factor: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function addEntity() {
	$.ajax({
		url : '/api/entities',
		type: 'PUT',
		data : $('#entityForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The entity has been added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				$('#entityForm')[0].reset();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The entity failed to be added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to add the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function addDocumentToEntity(entityid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/documents',
		type: 'PUT',
		data : $('#documentForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The document has been added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				$('#documentForm')[0].reset();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The document failed to be added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to add the document to the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function addFactorToEntity(entityid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/factors',
		type: 'PUT',
		data : $('#factorForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				$('#factorForm')[0].reset();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to add the factor to the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function editEntity(entityid) {
	$.ajax({
		url : '/api/entities/' + entityid,
		type: 'POST',
		data : $('#entityForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The entity has been updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The entity failed to be updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to update the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function updateDocumentForEntity(entityid, documentid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/documents/' + documentid,
		type: 'POST',
		data : $('#documentForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The document has been updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The document failed to be updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to update the document for the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function updateFactorForEntity(entityid, factorid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/factors/' + factorid,
		type: 'POST',
		data : $('#factorForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to update the factor for the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function removeDocumentFromEntity(entityid, documentid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/documents/' + documentid,
		type: 'DELETE',
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The document has been removed from the entity'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				window.location = '/acc/entity/' + entityid;
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The document failed to be removed from the entity'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to document the factor from the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function removeFactorFromEntity(entityid, factorid) {
	$.ajax({
		url : '/api/entities/' + entityid + '/factors/' + factorid,
		type: 'DELETE',
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been removed from the entity'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				window.location = '/acc/entity/' + entityid;
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be removed from the entity'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to remove the factor from the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function copyFactorToEntity(entityid, name, description, category, weight) {
	$.ajax({
		url : '/api/entities/' + entityid + '/factors',
		type: 'PUT',
		data : [
			{ name: "name", value: name },
			{ name: "description", value: description },
			{ name: "category", value: category },
			{ name: "weight", value: weight }
		],
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The factor has been copied'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The factor failed to be copied'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to copy the factor to the entity: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function addWatchPhrase() {
	$.ajax({
		url : '/api/watchphrases',
		type: 'PUT',
		data : $('#watchPhraseForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The watch phrase has been added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				$('#watchPhraseForm')[0].reset();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The watch phrase failed to be added'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to add the watch phrase: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function editWatchPhrase(watchphraseid) {
	$.ajax({
		url : '/api/watchphrases/' + watchphraseid,
		type: 'POST',
		data : $('#watchPhraseForm').serializeArray(),
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The watch phrase has been updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The watch phrase failed to be updated'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to update the watch phrase: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function removeWatchPhrase(watchphraseid) {
	$.ajax({
		url : '/acc/watchphrase/' + watchphraseid,
		type: 'DELETE',
		success : function (data) {
			if (data && data.code && data.code === "OK") {
				$('.notifications').notify({
					type : 'success',
					closable : false,
					message : {
						text : 'The watch phrase has been removed'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
				window.location = '/acc/watchphrases';
			} else {
				$('.notifications').notify({
					type : 'danger',
					closable : false,
					message : {
						text : 'The watch phrase failed to be removed'
					},
					transition : 'fade',
					fadeOut : {
						enabled : true,
						delay : 1000
					}
				}).show();
			}
		},
		error : function (res) {
			$('.notifications').notify({
				type : 'danger',
				closable : false,
				message : {
					text : 'Failed to remove the watch phrase: ' + JSON.parse(res.responseText).message
				},
				transition : 'fade',
				fadeOut : {
					enabled : true,
					delay : 1000
				}
			}).show();
		},
		dataType : 'json',
		cache : 'false'
	});
}

function getSearchResults(terms, cb) {
	var url = '/api/entities/search';
	if (!_.isUndefined(terms) && !_.isNull(terms) && terms !== "") {
		url += '/' + encodeURI(terms);
	}

	$.ajax({
		url : url,
		type : 'GET',
		success : function (data, textStatus, jqXHR) {
			if (_.isUndefined(data) || _.isNull(data) || _.isEmpty(data)) {
				cb('Error: Server did not respond.');
			} else if (data.code !== "OK") {
				cb('Error: ' + data.message);
			} else if (_.isUndefined(data.data.entities) || _.isNull(data.data.entities) || _.isEmpty(data.data.entities)) {
				cb('No data was found for your request.');
			} else {
				cb(null, data.data.entities);
			}
		},
		error : function (xhr, textStatus, error) {
			cb('An error occured while attempting to process your search');
		},
		cache : false
	});
}

function getFactorSearchResults(terms, cb) {
	var url = '/api/factors/search';
	if (!_.isUndefined(terms) && !_.isNull(terms) && terms !== "") {
		url += '/' + encodeURI(terms);
	}

	$.ajax({
		url : url,
		type : 'GET',
		success : function (data, textStatus, jqXHR) {
			if (_.isUndefined(data) || _.isNull(data) || _.isEmpty(data)) {
				cb('Error: Server did not respond.');
			} else if (data.code !== "OK") {
				cb('Error: ' + data.message);
			} else if ((_.isUndefined(data.data.factors) || _.isNull(data.data.factors) || _.isEmpty(data.data.factors)) && (_.isUndefined(data.data.entityfactors) || _.isNull(data.data.entityfactors) || _.isEmpty(data.data.entityfactors))) {
				cb('No data was found for your request.');
			} else {
				cb(null, data.data.factors, data.data.entityfactors);
			}
		},
		error : function (xhr, textStatus, error) {
			cb('An error occured while attempting to process your search');
		},
		cache : false
	});
}