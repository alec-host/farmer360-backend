const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const { createNewServiceRequest } = require('../model/create.business.service.request.model');
const model = require('../model/get.service.request.model');

exports.CreateNewSurveyRequest = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {request_type,survey_objective,survey_title,target_audience,number_of_participants,business_uuid,business_name,date_created} = req.body;
        try{  
            const request = {
                request_uuid:"REQ-S"+uuidv4(),
                request_type:request_type,
                survey_objective:survey_objective,
                survey_title:survey_title,
                target_audience:target_audience,
                number_of_participants:number_of_participants,
                business_uuid:business_uuid,
                business_name:business_name,
                date_created:date_created
            };  
            const created_request = await createNewServiceRequest(request);        
            if(business_uuid === created_request.business_uuid){
                const request_found = await model.getServiceRequest(created_request.business_uuid);
                res.status(201).json({
                    success: true,
                    error: false,
                    data: request_found.documents,
                    message: "Request has been recorded successfully."
                }); 
            }else{
                res.status(404).json({
                    success: true,
                    error: false,
                    data: [],
                    message: "Request not found."
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