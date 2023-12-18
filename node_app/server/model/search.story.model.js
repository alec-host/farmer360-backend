const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_STORIES } = require('../constants/constants');

const storySearch = async(reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_STORIES,[Query.equal('user_uuid',reference_number)]);

    return promise;
};

module.exports = {storySearch};