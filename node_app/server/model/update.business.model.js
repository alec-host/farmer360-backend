const { Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_FARMERS } = require('../constants/constants');

const updateBusinessDetails = async(db_configs,collection) => {
  
    const promise = await databases.updateDocument(db_configs.database_id,db_configs.table_id,db_configs.record_id,collection);

    return promise;
};

module.exports = {updateBusinessDetails};