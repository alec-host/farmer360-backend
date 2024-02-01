require('dotenv').config();

module.exports = {
    APP_SERVER_PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    DATABASE_NAME: process.env.DB_NAME,
    DATABASE_USER: process.env.DB_USER,
    DATABASE_HOST: process.env.DB_HOST,
    DATABASE_PORT: process.env.DB_PORT,
    DATABASE_PASS: process.env.DB_PASS,
    APP_WRITE_ENDPOINT: process.env.APP_WRITE_ENDPOINT,
    APP_WRITE_KEY: process.env.APP_WRITE_KEY,
    APP_WRITE_DATABASE_ID: process.env.APP_WRITE_DATABASE_ID,
    APP_WRITE_COLLECTION_ID_FARMERS: process.env.APP_WRITE_COLLECTION_ID_FARMERS,
    APP_WRITE_COLLECTION_ID_SHOPS: process.env.APP_WRITE_COLLECTION_ID_SHOPS,
    APP_WRITE_COLLECTION_ID_PRODUCTS: process.env.APP_WRITE_COLLECTION_ID_PRODUCTS,
    APP_WRITE_COLLECTION_ID_INBOXES: process.env.APP_WRITE_COLLECTION_ID_INBOXES,
    APP_WRITE_COLLECTION_ID_STORIES: process.env.APP_WRITE_COLLECTION_ID_STORIES,
    APP_WRITE_COLLECTION_ID_COMMENTS: process.env.APP_WRITE_COLLECTION_ID_COMMENTS,
    APP_WRITE_COLLECTION_ID_BUSINESS: process.env.APP_WRITE_COLLECTION_ID_BUSINESS,
    APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS: process.env.APP_WRITE_COLLECTION_ID_WALLET_TRANSACTIONS,
    APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS: process.env.APP_WRITE_COLLECTION_ID_SERVICE_REQUESTS,
    APP_WRITE_COLLECTION_ID_TAGGED: process.env.APP_WRITE_COLLECTION_ID_TAGGED,
    APP_WRITE_DOCUMENT_ID: process.env.APP_WRITE_DOCUMENT_ID,
    APP_WRITE_PROJECT_ID: process.env.APP_WRITE_PROJECT_ID,
    APP_WRITE_BUCKET_ID: process.env.APP_WRITE_BUCKET_ID,
    SYSTEM_ADMIN_NAME: process.env.SYSTEM_ADMIN_NAME,
    SYSTEM_ADMIN_UUID: process.env.SYSTEM_ADMIN_UUID
}