const { AppwriteException } = require('node-appwrite');
const { userSearch } = require('../model/search.user.model');
const { getComments } = require('../model/get.comments.model');

exports.GetComments = async(req,res) => {
    const {owner_reference_number,story_uuid,_page,_limit} = req.query;
    if(owner_reference_number){ 
        try{
            const user_found = await userSearch(owner_reference_number);
            if(user_found.total === 1){
                if(owner_reference_number === user_found.documents[0]?.reference_number){
                    let comments_found = {};
                    let _last_id = '0';
                    if(parseInt(_page) >= 1){
                        if(parseInt(_page) > 1){
                            const pageOne = await getComments(parseInt(_limit),story_uuid,_last_id,0);
                            _last_id = pageOne.documents[pageOne.documents.length - 1].$id;
                        }else{
                            _last_id = '0';
                        }
                        console.log(_page);
                        console.log(_last_id);
                        comments_found = await getComments(parseInt(_limit),story_uuid,_last_id,0);
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: comments_found.documents,
                            message: "Comments list with a size:-"+comments_found.total
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