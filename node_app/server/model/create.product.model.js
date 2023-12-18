const sdk = require('node-appwrite');

const client = require('../db/client');

const databases = new sdk.Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_PRODUCTS } = require('../constants/constants');

const createNewProduct = async(document) => {
    console.log(document);

    const promise = await databases.createDocument(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_PRODUCTS,sdk.ID.unique(),document);

    return promise;
};

module.exports = {createNewProduct};