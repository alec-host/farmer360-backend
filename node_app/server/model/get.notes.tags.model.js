const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_TAGGED } = require('../constants/constants');

const getNotesAndTags = async(farmer_uuid) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_TAGGED,[Query.equal("farmer_uuid",farmer_uuid),Query.orderDesc("$id")]);

    return promise;
};

module.exports = { getNotesAndTags };