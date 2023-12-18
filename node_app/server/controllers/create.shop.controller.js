const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.shop.model');
const { mailSearch } = require('../model/search.email.model');
const { shopSearch } = require('../model/search.shop.model');

exports.CreateNewShop = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {email,name,phone_number,about,owner_reference_number,date_created} = req.body;
        try{
            const email_found = await mailSearch(email);
            const exist = await shopSearch(owner_reference_number);
            if(email_found.total === 1){
                if(exist.total === 0){
                    const create_shop = {
                                            name:name,
                                            phone_number:phone_number,
                                            shop_uuid:"SHP"+uuidv4(),
                                            about:about,
                                            owner_reference_number:owner_reference_number,
                                            date_created:date_created
                                        };
                    const shop = await model.createNewShop(create_shop);
                    if(phone_number === shop.phone_number){
                        const shop_found = await shopSearch(shop.owner_reference_number);
                        res.status(201).json({
                            success: true,
                            error: false,
                            data: shop_found.documents,
                            message: "Shop has been created."
                        }); 
                    } 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Shop already exist."
                    }); 
                }
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Email is already taken."
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