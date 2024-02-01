const sdk = require('node-appwrite');

const client = require('../db/client');

const databases = new sdk.Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS } = require('../constants/constants');

const createNewWalletTransaction = async(document) => {
    console.log(document);

    const promise = await databases.createDocument(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS,sdk.ID.unique(),document);

    return promise;
};

module.exports = {createNewWalletTransaction};