const { Storage, InputFile, ID } = require('node-appwrite');
const { clientStorage } = require('../db/client.storage');
const { APP_WRITE_BUCKET_ID } = require('../constants/constants');

const storage = new Storage(clientStorage);

const mediaFileupload = async(filePath,fileName) => {
  
    const promise = storage.createFile(APP_WRITE_BUCKET_ID, ID.unique(), InputFile.fromPath(filePath,fileName));

    return promise;
};

module.exports = {mediaFileupload};