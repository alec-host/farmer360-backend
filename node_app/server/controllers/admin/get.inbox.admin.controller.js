const { AppwriteException } = require('node-appwrite');
const { getAdminInbox } = require('../../model/get.inbox.admin.model');
const { SYSTEM_ADMIN_UUID } = require('../../constants/constants');

exports.AdminGetInbox = async(req,res) => {
    const {reference_number} = req.query;
    
    if(reference_number){ 
        try{
            const inbox_found = await getAdminInbox('0000000000000000');
            if(inbox_found.total >= 1){
                const filtered_array = inbox_found.documents.filter((item) => item.recipient_uuid === SYSTEM_ADMIN_UUID || item.sender_uuid === SYSTEM_ADMIN_UUID);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: filtered_array,
                    message: "Inbox list."
                });
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "Empty inbox."
                }); 
            }
        }catch(e){
            if(e instanceof AppwriteException){
                console.log(e);
                res.status(200).json({
                    success: false,
                    error: true,
                    message: e?.response?.message
                });
            } 
        }
    }else{
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing: request payload not provided."
        }); 
    }
};