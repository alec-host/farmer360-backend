const { AppwriteException } = require('node-appwrite');

const { userBusinessSearch } = require('../model/search.user.business.model');
const { updateBusinessDetails } = require('../model/update.business.model');

exports.DeleteUserBusinessAccount = async(req,res) => {
    if(Object.keys(req.body).length !== 0){

        const { phone,business_uuid,database_id,table_id,record_id } = req.body;

        const json = {is_deleted:1};

        const user_found = await userBusinessSearch(business_uuid);

        try{
            const db_configs = {database_id,table_id,record_id};
            if(user_found.total === 1){
                const user = await updateBusinessDetails(db_configs,json);
                if(phone === user.phone){
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