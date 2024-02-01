const { AppwriteException } = require('node-appwrite');

const { SYSTEM_ADMIN_UUID } = require('../../constants/constants');
const { getAllStories } = require('../../model/get.stories.all.model');
const { getFarmerLimitedScope } = require('../../model/get.farmer.limited.scope.model');
const { getAllComments } = require('../../model/get.comments.all.model');
const { getAllServiceRequest } = require('../../model/get.service.request.all.model');
const { getBusinessLimitedScope } = require('../../model/get.business.limited.scope.model');

exports.AdminGetStats = async(req,res) => {
    const {reference_number} = req.query;
    
    if(reference_number){ 
        try{
            const has_profanity = 1;
            const request_type = ["api","survey"];
            const farmer_found = await getFarmerLimitedScope();
            const business_found = await getBusinessLimitedScope();
            const stories_found = await getAllStories(has_profanity);
            const comments_found = await getAllComments(has_profanity);
            const api_request_found = await getAllServiceRequest(request_type[0]);
            const survey_request_found = await getAllServiceRequest(request_type[1]);

            const dashboard_stats = {
                farmer_count: farmer_found.total,
                business_count: business_found.total,
                api_count: api_request_found.total,
                survey_count: survey_request_found.total,
                story_count: stories_found.total,
                comment_count: comments_found.total
            };

            res.status(200).json({
                success: true,
                error: false,
                data: [dashboard_stats],
                message: "Stats list."
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