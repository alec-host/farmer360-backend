const { AppwriteException } = require('node-appwrite');
const { getBusinessLimitedScope } = require('../../model/get.business.limited.scope.model');

exports.AdminGetBusinessLimitedScope = async(req,res) => {
    const {reference_number} = req.query;
    if(reference_number){ 
        try{
            const business_found = await getBusinessLimitedScope();

            if(business_found.total > 0){

                const formatted_array = business_found.documents.map(({ business_name,business_uuid,owner_full_name,email,country,subscription,date_created,is_suspended,$id, ...rest }) => ({
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

                res.status(200).json({
                    success: true,
                    error: false,
                    data: formatted_array,
                    message: "Business limited scope list."
                });
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "Empty list."
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