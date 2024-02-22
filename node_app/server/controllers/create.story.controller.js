const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.story.model');
const { userSearch } = require('../model/search.user.model');
const { storySearch } = require('../model/search.story.model');
const { mediaFileupload } = require('../services/BUCKET.STORE');
const { APP_WRITE_BUCKET_ID, APP_WRITE_PROJECT_ID } = require('../constants/constants');

exports.CreateNewStory = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {posted_story,topic,is_profane,owner_reference_number,full_name,original_file_name,date_created,action} = req.body;
        try{
            const user_found = await userSearch(owner_reference_number);
            if(parseInt(user_found.total) === 1){ 
                let has_profane_words = 0;
                if(is_profane === false){
                    has_profane_words = 0;
                }else{
                    has_profane_words = 1;
                }
                if(action === "file"){
                    const file_upload = await mediaFileupload(req.file.path,original_file_name);
                    if(file_upload.chunksUploaded >= 1){
                        const image_url = `https://cloud.appwrite.io/v1/storage/buckets/${APP_WRITE_BUCKET_ID}/files/${file_upload.$id}/view?project=${APP_WRITE_PROJECT_ID}&mode=admin`;
                        const create_story = {
                                                post_uuid:"STO"+uuidv4(),
                                                topic:topic,
                                                story:posted_story,
                                                image_url:image_url,
                                                user_uuid:owner_reference_number,
                                                full_name:full_name,
                                                has_profane_words:has_profane_words,
                                                date_created:date_created
                                            };

                        const story = await model.createNewStory(create_story);

                        if(owner_reference_number === story.user_uuid){
                            const story_found = await storySearch(story.user_uuid);
                            res.status(201).json({
                                success: true,
                                error: false,
                                data: story_found.documents,
                                message: "Story has been created."
                            }); 
                        }
                    }
                }else{
                    const create_story = {
                                            post_uuid:"STO"+uuidv4(),
                                            story:posted_story,
                                            topic:topic,
                                            user_uuid:owner_reference_number,
                                            full_name:full_name,
                                            has_profane_words:has_profane_words,
                                            date_created:date_created
                                        };  
                   
                    const story = await model.createNewStory(create_story);
               
                    if(owner_reference_number === story.user_uuid){
                        const story_found = await storySearch(story.user_uuid);
                        res.status(201).json({
                            success: true,
                            error: false,
                            data: story_found.documents,
                            message: "Story has been created."
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