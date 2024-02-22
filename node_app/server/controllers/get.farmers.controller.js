const { AppwriteException } = require('node-appwrite');
const { mailBusinessSearch } = require('../model/search.email.business.model');
const { getFarmers } = require('../model/get.farmers.model');

exports.GetFarmers = async(req,res) => {
    const {business_uuid,email,_page,_limit} = req.query;
    if(business_uuid){ 
        try{
            const mail_found = await mailBusinessSearch(email);
            if(mail_found.total === 1){
                if(business_uuid === mail_found.documents[0].business_uuid){
                    let farmers_found = {};
                    let _last_id = '0';
                    if(parseInt(_page) >= 1){
                        if(parseInt(_page) > 1){
                            const pageOne = await getFarmers(parseInt(_limit),_last_id);
                            _last_id = pageOne.documents[pageOne.documents.length - 1].$id;
                        }else{
                            _last_id = '0';
                        }
                        farmers_found = await getFarmers(parseInt(_limit),_last_id);
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: farmers_found.documents,
                            message: "Farmer details. -" + farmers_found.total
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
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "User not found."
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