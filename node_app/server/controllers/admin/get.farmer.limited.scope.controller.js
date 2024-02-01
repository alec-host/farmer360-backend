const { AppwriteException } = require('node-appwrite');
const { getFarmerLimitedScope } = require('../../model/get.farmer.limited.scope.model');

exports.AdminGetFarmerLimitedScope = async(req,res) => {
    const {reference_number} = req.query;
    console.log(req.query);
    if(reference_number){ 
        try{
            const farmer_found = await getFarmerLimitedScope();
            
            if(farmer_found.total >= 1){

                const formatted_array = farmer_found.documents.map(({ first_name,last_name,business_name,reference_number,email,county,subscription,date_created,is_suspended,$id, ...rest }) => ({
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

                res.status(200).json({
                    success: true,
                    error: false,
                    data: formatted_array,
                    message: "Farmer limited scope list."
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