const { AppwriteException } = require('node-appwrite');
const model = require('../model/update.shop.model');
const { mailSearch } = require('../model/search.email.model');
const { getProduct } = require('../model/get.product.model');

exports.GetProduct = async(req,res) => {
    const {owner_reference_number} = req.query;
    const {email} = req.query;
    if(owner_reference_number){ 
        try{
            const mail_found = await mailSearch(email);
            const product_found = await getProduct(owner_reference_number);
            if(mail_found.total === 1){
                if(product_found.total > 0){
                    if(mail_found.owner_reference_number === product_found.owner_reference_number){
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: product_found.documents,
                            message: "Product list."
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