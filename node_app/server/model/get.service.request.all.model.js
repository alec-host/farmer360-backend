const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS } = require('../constants/constants');

const getAllServiceRequest = async(request_type) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS,[Query.equal('request_type',request_type),Query.orderDesc("date_created")]);

    return promise;
};

module.exports = {getAllServiceRequest};