const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_COMMENTS } = require('../constants/constants');

const getAllComments = async() => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_COMMENTS,[Query.orderDesc("date_created")]);

    return promise;
};

module.exports = {getAllComments};