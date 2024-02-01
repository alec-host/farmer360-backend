const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_BUSINESS } = require('../constants/constants');

const userBusinessSearch = async(business_uuid) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_BUSINESS,[Query.equal('business_uuid',business_uuid),]);

    return promise;
};

module.exports = {userBusinessSearch};