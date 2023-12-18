const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_SHOPS, APP_WRITE_COLLECTION_ID_PRODUCTS } = require('../constants/constants');

const shopSearch = async(owner_reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_SHOPS,[Query.equal('owner_reference_number',owner_reference_number)]);

    return promise;
};

module.exports = {shopSearch};