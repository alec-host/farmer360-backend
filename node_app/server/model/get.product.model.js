const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_PRODUCTS } = require('../constants/constants');

const getProduct = async(owner_reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_PRODUCTS,[Query.equal('owner_reference_number',owner_reference_number),Query.orderDesc("date_created")]);

    return promise;
};

module.exports = {getProduct};