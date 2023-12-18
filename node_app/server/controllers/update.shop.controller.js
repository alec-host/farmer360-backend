const { AppwriteException } = require('node-appwrite');
const model = require('../model/update.shop.model');
const { mailSearch } = require('../model/search.email.model');
const { shopSearch } = require('../model/search.shop.model');

exports.ModifyShop = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { action,phone_number,owner_reference_number,database_id,table_id,record_id } = req.body;

        let json = {};
        
        switch(action){
            case "update_contract":
                const {name,phone_number,about} = req.body;
                json = {name,phone_number,about};
            break;
            case "socials":
                const {website_url,facebook_link} = req.body;
                json = {website_url,facebook_link};
            break;
        };

        try{
            const shop_found = await shopSearch(owner_reference_number);
            const db_configs = {database_id,table_id,record_id};
            if(shop_found.total === 1){
                const shop = await model.updateShopDetails(db_configs,json);
                console.log(shop);
                if(phone_number === shop.phone_number){
                    const update_shop = await shopSearch(shop.owner_reference_number);
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: update_shop.documents,
                        message: "Shop updated successfully."
                    }); 
                } 
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Shop not found."
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