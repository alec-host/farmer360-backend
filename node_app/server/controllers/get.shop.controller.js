const { AppwriteException } = require('node-appwrite');
const { mailSearch } = require('../model/search.email.model');
const { shopSearch } = require('../model/search.shop.model');

exports.GetShop = async(req,res) => {
    const {owner_reference_number} = req.query;
    const {email} = req.query;
    if(owner_reference_number){ 
        try{
            const mail_found = await mailSearch(email);
            const shop_found = await shopSearch(owner_reference_number);

            if(mail_found.total === 1){
                if(shop_found.total === 1){
                    if(mail_found.owner_reference_number === shop_found.owner_reference_number){
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: shop_found.documents,
                            message: "Shop details."
                        });
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: "Shop not found."
                    }); 
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