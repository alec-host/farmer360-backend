const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_COMMENTS } = require('../constants/constants');

const getAllComments = async(has_profanity) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_COMMENTS,[Query.equal("has_profane_words",has_profanity),Query.orderDesc("$id")]);

    return promise;
};

module.exports = {getAllComments};