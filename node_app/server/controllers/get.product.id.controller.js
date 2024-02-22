const { AppwriteException } = require('node-appwrite');
const model = require('../model/update.shop.model');
const { getProductByID } = require('../model/get.product.id.model');
const { userSearch } = require('../model/search.user.model');

exports.GetProductByID = async(req,res) => {
    const {owner_reference_number,product_reference_number} = req.query;

    if(owner_reference_number){ 
        try{
            const user_found = await userSearch(owner_reference_number);
            const product_found = await getProductByID(product_reference_number);
            if(user_found.total === 1){
                if(product_found.total > 0){
                    if(user_found.owner_reference_number === product_found.owner_reference_number){
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: product_found.documents,
                            message: "Product found."
                        });
                    }
                }else{
                    res.status(404).json({
                        success: false,
                        error: true,
                        message: "Product not found."
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