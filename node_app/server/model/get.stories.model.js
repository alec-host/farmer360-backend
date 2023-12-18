const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_STORIES } = require('../constants/constants');

const getStories = async(_limit,_last_id) => {

    if(_last_id === '0'){
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_STORIES,[Query.orderDesc("date_created"),Query.limit(_limit)]);
    } else{
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_STORIES,[Query.orderDesc("date_created"),Query.limit(_limit),Query.cursorAfter(_last_id)]);
    }
    
    return promise;
};

module.exports = {getStories};