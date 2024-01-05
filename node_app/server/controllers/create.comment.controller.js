const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.comment.model');
const { userSearch } = require('../model/search.user.model');
const { commentSearch } = require('../model/search.comment.model');

exports.CreateNewComment = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {post_uuid,posted_comment,owner_reference_number,full_name,date_created} = req.body;
        console.log(req.body);
        try{
            const user_found = await userSearch(owner_reference_number);
            if(parseInt(user_found.total) === 1){
                const create_comment = {
                                            comment_uuid:"CMT"+uuidv4(),
                                            comment:posted_comment,
                                            story_uuid:post_uuid,
                                            owner_reference_number:owner_reference_number,
                                            commenters_name:full_name,
                                            date_created:date_created
                                       };
                console.log(create_comment);
                const comment = await model.createNewComment(create_comment);
                console.log(comment);
                if(owner_reference_number === comment.owner_reference_number){
                    const comment_found = await commentSearch(comment.owner_reference_number);
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