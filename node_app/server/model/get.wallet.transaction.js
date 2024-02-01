const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS } = require('../constants/constants');

const getWalletTransactionByUserID = async(reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS,[Query.equal('reference_number',reference_number),]);

    return promise;
};

module.exports = {getWalletTransactionByUserID};