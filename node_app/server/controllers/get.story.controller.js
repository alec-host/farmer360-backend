const { AppwriteException } = require('node-appwrite');
const { userSearch } = require('../model/search.user.model');
const { storySearch } = require('../model/search.story.model');

exports.GetStory = async(req,res) => {
    const {owner_reference_number,email} = req.query;

    if(owner_reference_number){ 
        try{
            const user_found = await userSearch(owner_reference_number);
            if(user_found.total === 1){
                if(owner_reference_number === user_found.documents[0]?.reference_number){
                    const story_found = await storySearch(user_found.documents[0]?.reference_number);
                    res.status(201).json({
                        success: true,
                        error: false,
                        data: story_found.documents,
                        message: "Get a list of stories that belongs to you."
                    }); 
                } 
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User does not exist."
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