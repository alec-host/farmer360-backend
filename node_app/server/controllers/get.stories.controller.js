const { AppwriteException } = require('node-appwrite');
const { userSearch } = require('../model/search.user.model');
const { mailSearch } = require('../model/search.email.model');
const { getStories } = require('../model/get.stories.model');

exports.GetStories = async(req,res) => {
    const {owner_reference_number,email,_page,_limit} = req.query;
    if(owner_reference_number){ 
        try{
            const user_found = await userSearch(owner_reference_number);
            const mail_found = await mailSearch(email);
            if(user_found.total === 1){
                if(owner_reference_number === user_found.documents[0]?.reference_number){
                    let stories_found = {};
                    let _last_id = '0';
                    if(parseInt(_page) >= 1){
                        if(parseInt(_page) > 1){
                            const pageOne = await getStories(parseInt(_limit),_last_id,0);
                            _last_id = pageOne.documents[pageOne.documents.length - 1].$id;
                        }else{
                            _last_id = '0';
                        }
                        stories_found = await getStories(parseInt(_limit),_last_id,0);
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: stories_found.documents,
                            message: "Stories list with a size:-"+stories_found.total
                        }); 
                    }else{
                        res.status(200).json({
                            success: false,
                            error: true,
                            message: "Page param has to be greater than zero."
                        }); 
                    }  
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