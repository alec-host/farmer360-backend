const { AppwriteException } = require('node-appwrite');
const { updateUserDetails } = require('../../model/update.user.model');
const { userSearch } = require('../../model/search.user.model');
const { userBusinessSearch } = require('../../model/search.user.business.model');
const { updateBusinessDetails } = require('../../model/update.business.model');
const { getFarmerLimitedScope } = require('../../model/get.farmer.limited.scope.model');
const { getBusinessLimitedScope } = require('../../model/get.business.limited.scope.model');

exports.SuspendUserAccount = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
       
        const { user_type,reference_number,is_suspended,database_id,table_id,record_id } = req.body;
        
        const json = {is_suspended};
 
        try{
            const db_configs = {database_id,table_id,record_id};
            let user_found = {};

            if(user_type === "farmer"){
                user_found = await userSearch(reference_number);
            }else{
                user_found = await userBusinessSearch(reference_number);
            }

            if(user_found.total === 1){
                let formatted_array = {};
                
                if(user_type === "farmer"){
                    const user = await updateUserDetails(db_configs,json);
                    const farmer_data = await getFarmerLimitedScope();
                    formatted_array = farmer_data.documents.map(({ first_name,last_name,business_name,reference_number,email,county,subscription,date_created,is_suspended,$id, ...rest }) => ({
                        name: first_name !== null && first_name !== 'N/A' && last_name !== 'N/A' ? `${first_name} ${last_name}` : business_name,
                        value: reference_number,
                        email: email,
                        county: county,
                        subscription: subscription,
                        date_created: date_created,
                        is_suspended: is_suspended,
                        $id: $id,
                        ...rest,
                    }));
                }else{
                    const user = await updateBusinessDetails(db_configs,json);
                    const business_found = await getBusinessLimitedScope();
                    formatted_array = business_found.documents.map(({ business_name,business_uuid,owner_full_name,email,country,subscription,date_created,is_suspended,$id, ...rest }) => ({
                        name:  business_name,
                        value: business_uuid,
                        owner_full_name: owner_full_name,
                        email: email,
                        country: country,
                        subscription: subscription,
                        date_created: date_created,
                        is_suspended: is_suspended,
                        $id: $id,
                        ...rest,
                    }));
                }
                res.status(200).json({
                    success: true,
                    error: false,
                    data: formatted_array,
                    message: "Update was successful."
                }); 
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User a/c not found."
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