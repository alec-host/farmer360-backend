const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const { createNewNoteAndTag } = require('../model/create.business.tag.model');
const { userBusinessSearch } = require('../model/search.user.business.model');
const { getNotesAndTags } = require('../model/get.notes.tags.model');

exports.CreateNewNoteAndTag = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {notes,farmer_uuid,business_uuid,date_created} = req.body;
        try{
            const user_found = await userBusinessSearch(business_uuid);
            if(parseInt(user_found.total) === 1){
                const create_payload = {
                                            tag_uuid:"NAT"+uuidv4(),
                                            notes:notes,
                                            farmer_uuid:farmer_uuid,
                                            business_uuid:business_uuid,
                                            date_created:date_created
                                        };
                const record = await createNewNoteAndTag(create_payload);
                if(business_uuid === record.business_uuid){
                    const record_found = await getNotesAndTags(farmer_uuid);
                    res.status(201).json({
                        success: true,
                        error: false,
                        data: record_found.documents,
                        message: "Note & Tag has been created."
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