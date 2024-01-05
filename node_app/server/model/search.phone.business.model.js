const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_BUSINESS } = require('../constants/constants');

const phoneBusinessSearch = async(phone) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_BUSINESS,[Query.equal('phone',phone),]);

    return promise;
};

module.exports = {phoneBusinessSearch};