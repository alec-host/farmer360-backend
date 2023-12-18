const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const { userSearch } = require('../model/search.user.model');
const { createNewInbox } = require('../model/create.inbox.model');
const { getInbox } = require('../model/get.inbox.model');
const { SYSTEM_ADMIN_NAME, SYSTEM_ADMIN_UUID } = require('../constants/constants');

exports.CreateNewInbox = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {action,sender_uuid,recipient_uuid,subject,body,date_created} = req.body;
        try{ 

            let inbox = {};
            let exist = 0;

            if(action === "user_reply"){   
                exist = await userSearch(sender_uuid); 
                const full_name = exist.documents[0].first_name +" "+ exist.documents[0].last_name;
                inbox = {
                    message_uuid:"MSG"+uuidv4(),
                    subject:subject,
                    body:body,
                    recipient_uuid:SYSTEM_ADMIN_UUID,
                    sender_name:full_name,
                    sender_uuid:sender_uuid,
                    date_created:date_created
                };                
            }else{       
                exist = await userSearch(recipient_uuid); 
                inbox = {
                    message_uuid:"MSG"+uuidv4(),
                    subject:subject,
                    body:body,
                    recipient_uuid:recipient_uuid,
                    sender_name:SYSTEM_ADMIN_NAME,
                    sender_uuid:SYSTEM_ADMIN_UUID,
                    date_created:date_created
                };
            }
     
            if(exist.total > 0){                
                    const created_inbox = await createNewInbox(inbox);
                    const inbox_found = await getInbox(created_inbox.recipient_uuid);
                    res.status(201).json({
                        success: true,
                        error: false,
                        data: inbox_found.documents,
                        message: "Inbox message created."
                    });
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User does not exist."
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