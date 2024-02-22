const { AppwriteException } = require('node-appwrite');

const { userSearch } = require('../model/search.user.model');
const { updateUserDetails } = require('../model/update.user.model');

exports.DeleteUserAccount = async(req,res) => {
    if(Object.keys(req.body).length !== 0){

        const { phone,reference_number,database_id,table_id,record_id } = req.body;

        const json = {is_deleted:1};

        const user_found = await userSearch(reference_number);

        try{
            const db_configs = {database_id,table_id,record_id};
            if(user_found.total === 1){
                const user = await updateUserDetails(db_configs,json);
                if(phone === user.msisdn){
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: [],
                        message: "User account has been deactivated."
                    }); 
                } 
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User not found."
                }); 
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