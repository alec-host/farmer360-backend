const { AppwriteException } = require('node-appwrite');
const { updateUserDetails } = require('../model/update.user.model');
const { mediaFileupload } = require('../services/BUCKET.STORE');
const { APP_WRITE_BUCKET_ID, APP_WRITE_PROJECT_ID } = require('../constants/constants');
const { userSearch } = require('../model/search.user.model');

exports.UpdateUserBusinessDetails = async(req,res) => {
    if(Object.keys(req.body).length !== 0){

        const {pin,id_number,business_address,farm_item,owner_reference_number,database_id,table_id,record_id } = req.body;
        
        let image_id_url = null;
        let image_cert_url = null;

        const file_upload_1 = await mediaFileupload(req.files.id_file[0].path,'ID_'+id_number+'.png');
        if(file_upload_1.chunksUploaded >= 1){
             image_id_url = `https://cloud.appwrite.io/v1/storage/buckets/${APP_WRITE_BUCKET_ID}/files/${file_upload_1.$id}/view?project=${APP_WRITE_PROJECT_ID}&mode=admin`;
        }
        const file_upload_2 = await mediaFileupload(req.files.business_cert_file[0].path,'BIZ_CERT_'+id_number+'.png');
        if(file_upload_2.chunksUploaded >= 1){
            image_cert_url = `https://cloud.appwrite.io/v1/storage/buckets/${APP_WRITE_BUCKET_ID}/files/${file_upload_2.$id}/view?project=${APP_WRITE_PROJECT_ID}&mode=admin`;
        }

        const data = {farmed_items:farm_item,is_profile_completed:1,business_info:JSON.stringify([{pin:pin,id_number:id_number,address:business_address,img_id_url:image_id_url,image_cert_url:image_cert_url}])};

        try{
            const user_found = await userSearch(owner_reference_number);

            const db_configs = {database_id,table_id,record_id};

            if(user_found.total == 1){
                const updated_data = await updateUserDetails(db_configs,data);
                const user_found = await userSearch(owner_reference_number);
                console.log(user_found);
                console.log(updated_data.reference_number);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: user_found.documents,
                    message: "Update was successful."
                }); 
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