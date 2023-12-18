const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_PRODUCTS } = require('../constants/constants');

const getProducts = async(_limit,_last_id) => {

    if(_last_id === '0'){
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_PRODUCTS,[Query.equal("is_published",1),Query.orderDesc("date_created"),Query.limit(_limit)]);
    } else{
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_PRODUCTS,[Query.equal("is_published",1),Query.orderDesc("date_created"),Query.limit(_limit),Query.cursorAfter(_last_id)]);
    }
    
    return promise;
};

module.exports = {getProducts};