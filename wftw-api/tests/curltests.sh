curl -X PUT localhost:4243/api/vendors -H 'content-type: application/json' --data-binary '{ "businessname": "test business", "firstname": "first", "lastname": "last", "email": "test@domain.com", "phone": "5551234567", "description": "a very long description", "requestedspacecount": 20 }'


curl localhost:4243/api/vendors



curl -X POST localhost:4243/api/vendors/525fc247d31baf8a48000002/contributions -H 'content-type: application/json' --data-binary '{ "contributionpercentage" : 0.2, "totalsales" : 123.45 }'