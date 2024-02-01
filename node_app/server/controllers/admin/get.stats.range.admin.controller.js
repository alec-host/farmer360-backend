const { AppwriteException } = require('node-appwrite');

const { getAllStories } = require('../../model/get.stories.all.model');
const { getFarmerLimitedScope } = require('../../model/get.farmer.limited.scope.model');
const { getAllComments } = require('../../model/get.comments.all.model');
const { getAllServiceRequest } = require('../../model/get.service.request.all.model');
const { getBusinessLimitedScope } = require('../../model/get.business.limited.scope.model');

exports.AdminGetRangeStats = async(req,res) => {
    const {reference_number} = req.query;
    const {stat} = req.query;
    
    if(reference_number){ 
        try{
            const has_profanity = 1;
            const request_type = ["api","survey"];

            let result_found = {};

            switch(stat){
                case "farmer": 
                    result_found = await getFarmerLimitedScope();
                break;
                case "business":
                    result_found = await getBusinessLimitedScope(); 
                break;
                case "story": 
                    result_found = await getAllStories(has_profanity);
                break;
                case "comment": 
                    result_found = await getAllComments(has_profanity);
                break;
                case "api": 
                    result_found = await getAllServiceRequest(request_type[0]);
                break;
                case "survey": 
                    result_found = await getAllServiceRequest(request_type[1]);
                break;
                default: break;
            }
            res.status(200).json({
                success: true,
                error: false,
                data: result_found.documents,
                message: "Range stat list."
            });
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