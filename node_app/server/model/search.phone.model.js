const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_FARMERS } = require('../constants/constants');

const phoneSearch = async(msisdn) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_FARMERS,[Query.equal('msisdn',msisdn)]);

    return promise;
};

module.exports = {phoneSearch};