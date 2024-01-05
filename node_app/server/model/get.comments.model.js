const { Query, Databases } = require('node-appwrite');

const client = require('../db/client');

const databases = new Databases(client);

const { APP_WRITE_DATABASE_ID, APP_WRITE_COLLECTION_ID_COMMENTS } = require('../constants/constants');

const getComments = async(_limit,story_uuid,_last_id) => {

    if(_last_id === '0'){
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_COMMENTS,[Query.equal("story_uuid",story_uuid),Query.orderDesc("date_created"),Query.limit(_limit)]);
    } else{
        promise = await databases.listDocuments(APP_WRITE_DATABASE_ID,APP_WRITE_COLLECTION_ID_COMMENTS,[Query.equal("story_uuid",story_uuid),Query.orderDesc("date_created"),Query.limit(_limit),Query.cursorAfter(_last_id)]);
    }
    
    return promise;
};

module.exports = {getComments};