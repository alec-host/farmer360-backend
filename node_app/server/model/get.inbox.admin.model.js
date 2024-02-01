const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_INBOXES } = require('../constants/constants');

const getAdminInbox = async(recipient_uuid) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_INBOXES,[Query.orderDesc('$id')]);

    return promise;
};

module.exports = {getAdminInbox};