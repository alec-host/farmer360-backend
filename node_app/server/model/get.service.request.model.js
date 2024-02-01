const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS } = require('../constants/constants');

const getServiceRequest = async(business_uuid) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS,[Query.equal('business_uuid',business_uuid),Query.orderDesc("date_created")]);

    return promise;
};

module.exports = {getServiceRequest};