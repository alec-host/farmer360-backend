const sdk = require('node-appwrite');

const client = require('../db/client');

const databases = new sdk.Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_INBOXES } = require('../constants/constants');

const createNewInbox = async(document) => {
    console.log(document);

    console.log(APP_WRITE_COLLECTION_ID_INBOXES);

    const promise = await databases.createDocument(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_INBOXES,sdk.ID.unique(),document);

    return promise;
};

module.exports = {createNewInbox};