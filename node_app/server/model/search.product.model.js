const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_PRODUCTS } = require('../constants/constants');

const productSearch = async(product_reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_PRODUCTS,[Query.equal('product_reference_number',product_reference_number),]);

    return promise;
};

module.exports = {productSearch};