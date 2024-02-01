const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_STORIES } = require('../constants/constants');

const getAllStories = async(has_profanity) => {

    promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_STORIES,[Query.equal("has_profane_words",has_profanity),Query.orderDesc("$id")]);
    
    return promise;
};

module.exports = {getAllStories};