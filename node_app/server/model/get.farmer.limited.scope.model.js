const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_FARMERS } = require('../constants/constants');

const getFarmerLimitedScope = async() => {

    promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_FARMERS,[Query.select(["first_name","last_name","business_name","reference_number","email","country","subscription","date_created","is_suspended","$id"]),Query.orderDesc("$id")]);
    
    return promise;
};

module.exports = {getFarmerLimitedScope};