const sdk = require('node-appwrite');
const { APP_WRITE_PROJECT_ID, APP_WRITE_KEY, APP_WRITE_ENDPOINT } = require('../constants/constants');

// Init SDK
const client = new sdk.Client();

client
    .setEndpoint(APP_WRITE_ENDPOINT)
    .setProject(APP_WRITE_PROJECT_ID)
    .setKey(APP_WRITE_KEY)
;

module.exports = {clientStorage:client};