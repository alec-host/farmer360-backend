const { SYSTEM_ADMIN_DATA } = require("../constants/constants");

const adminAuthentication = async() => {
    return await SYSTEM_ADMIN_DATA;
};


module.exports = {adminAuthentication};