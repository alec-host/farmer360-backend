const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_FARMERS } = require('../constants/constants');

const mailSearch = async(email) => {
  
    const promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_FARMERS,[Query.equal('email',email),Query.equal('is_verified',1)]);

    return promise;
};

module.exports = {mailSearch};