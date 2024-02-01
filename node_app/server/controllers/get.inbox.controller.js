const { AppwriteException } = require('node-appwrite');
const { mailSearch } = require('../model/search.email.model');
const { getInbox } = require('../model/get.inbox.model');

exports.GetInbox = async(req,res) => {
    const {owner_reference_number} = req.query;
    const {email} = req.query;
    if(owner_reference_number){ 
        try{
            const mail_found = await mailSearch(email);
            const inbox_found = await getInbox(owner_reference_number);
            if(parseInt(mail_found.total) === 1){
                if(inbox_found.total > 0){
                    if(mail_found.owner_reference_number === inbox_found.recipient_uuid){
                        console.log(inbox_found.documents);
                        const filtered_array = inbox_found.documents.filter((item) => item.recipient_uuid === owner_reference_number || item.sender_uuid === owner_reference_number);
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: filtered_array,
                            message: "Inbox list."
                        });
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: "Inbox empty."
                    }); 
                }
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "User not found."
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