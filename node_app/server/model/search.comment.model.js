const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_COMMENTS } = require('../constants/constants');

const commentSearch = async(reference_number) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_COMMENTS,[Query.equal('owner_reference_number',reference_number)]);

    return promise;
};

module.exports = {commentSearch};