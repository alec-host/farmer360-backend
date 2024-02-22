import { SYSTEM_ADMIN_EMAIL, SYSTEM_ADMIN_NAME, SYSTEM_ADMIN_PASSWORD, SYSTEM_ADMIN_UUID } from "../constants/constants";

const getAdminData = () => {
    const data = {
        name: SYSTEM_ADMIN_NAME,
        uuid: SYSTEM_ADMIN_UUID,
        email: SYSTEM_ADMIN_EMAIL,
        password: SYSTEM_ADMIN_PASSWORD,
    };
    return data;
}

module.exports = getAdminData;