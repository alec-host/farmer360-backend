const { AppwriteException } = require('node-appwrite');
const { getAllServiceRequest } = require('../../model/get.service.request.all.model');

exports.AdminGetAllServiceRequests = async(req,res) => {
    const {reference_number, request_type} = req.query;
    if(reference_number){ 
        try{
            const request = await getAllServiceRequest(request_type);
            console.log(request);
            res.status(200).json({
               success: false,
                error: true,
                data: request.documents,
                message: "Request list."
            });  
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