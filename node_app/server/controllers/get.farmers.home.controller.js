const { AppwriteException } = require('node-appwrite');
const { mailBusinessSearch } = require('../model/search.email.business.model');
const { getFarmers } = require('../model/get.farmers.model');

exports.GetFarmersHomePage = async(req,res) => {
    const {_page,_limit} = req.query;
    if(1===1){ 
        try{
            let farmers_found = {};
            let _last_id = '0';
            if(parseInt(_page) >= 1){
                if(parseInt(_page) > 1){
                    const pageOne = await getFarmers(parseInt(_limit),_last_id);
                    _last_id = pageOne.documents[pageOne.documents.length - 1].$id;
                }else{
                    _last_id = '0';
                }
                console.log(_last_id);
                console.log(_page);
                farmers_found = await getFarmers(parseInt(_limit),_last_id);
                console.log(farmers_found);
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
        }catch(e){
            if(e instanceof AppwriteException){
                console.log(e);
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