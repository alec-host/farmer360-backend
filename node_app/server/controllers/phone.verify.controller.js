const { AppwriteException } = require('node-appwrite');
const { phoneSearch } = require('../model/search.phone.model');
const { updateUserDetails } = require('../model/update.user.model');
const { phoneBusinessSearch } = require('../model/search.phone.business.model');

exports.VerifyPhoneNumber = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
       
        const { phone,is_verified,entity_type} = req.body;
        try{
            let phone_found = {};

            if(entity_type === "farmer"){
                phone_found = await phoneSearch(phone);
            }else {
                phone_found = await phoneBusinessSearch(phone);
            }

            const json = {is_verified};

            const database_id = phone_found.documents[0].$databaseId;
            const table_id = phone_found.documents[0].$collectionId;
            const record_id = phone_found.documents[0].$id;
            
            const db_configs = {database_id,table_id,record_id};

            if(phone_found.total === 1){
                const user = await updateUserDetails(db_configs,json);

                if(phone === user.msisdn || phone === user.phone){
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: [],
                        message: "Update was successful."
                    }); 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Phone not found."
                    });
                }                 
            }
        }catch(e){
            if(e instanceof AppwriteException){
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