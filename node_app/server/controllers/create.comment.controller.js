const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.comment.model');
const { userSearch } = require('../model/search.user.model');
const { getAllComments } = require('../model/get.comments.all.model');

exports.CreateNewComment = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {post_uuid,posted_comment,is_profane,owner_reference_number,full_name,date_created} = req.body;
        try{
            const user_found = await userSearch(owner_reference_number);
            if(parseInt(user_found.total) === 1){
                let has_profane_words = 0;
                if(is_profane === false){
                    has_profane_words = 0;
                }else{
                    has_profane_words = 1;
                }

                const create_comment = {
                                            comment_uuid:"CMT"+uuidv4(),
                                            comment:posted_comment,
                                            story_uuid:post_uuid,
                                            owner_reference_number:owner_reference_number,
                                            commenters_name:full_name,
                                            has_profane_words:has_profane_words,
                                            date_created:date_created
                                       };
                       
                const comment = await model.createNewComment(create_comment);
                if(owner_reference_number === comment.owner_reference_number){
                    const comment_found = await getAllComments(0);                  
                    res.status(201).json({
                        success: true,
                        error: false,
                        data: comment_found.documents,
                        message: "Comment has been created."
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