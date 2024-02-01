const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_BUSINESS } = require('../constants/constants');

const getBusinessLimitedScope = async() => {

    promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_BUSINESS,[Query.select(["business_uuid","business_name","owner_full_name","email","country","subscription","date_created","is_suspended","$id"]),Query.orderDesc("$id")]);
    
    return promise;
};

module.exports = {getBusinessLimitedScope};