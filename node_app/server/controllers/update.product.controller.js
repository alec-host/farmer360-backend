const { AppwriteException } = require('node-appwrite');
const model = require('../model/update.product.model');
const { productSearch } = require('../model/search.product.model');
const { getProduct } = require('../model/get.product.model');

exports.ModifyProduct = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const { action,product_name,product_price,product_qty,description,product_reference_number,is_published,date_created,database_id,table_id,record_id } = req.body;
        try{    
            let modify_product = {};   
            switch(action){
                case "NAME":
                    modify_product = {product_name};
                break;
                case "PRICE":
                    modify_product = {price:product_price};
                break;
                case "QTY":
                    modify_product = {quantity:product_qty};
                break;
                case "DESCRIPTION":
                    modify_product = {description};
                break;
                case "PUBLISH":
                    modify_product = {is_published};
                break;
                default:
                    modify_product = {
                        product_name:product_name,
                        price:product_price,
                        quantity:product_qty,
                        description:description,
                        date_created:date_created
                    };
                break;                   
            };  

            const product_found = await productSearch(product_reference_number);

            const db_configs = {database_id,table_id,record_id};
            if(product_found.total === 1){
                const product = await model.updateProductDetails(db_configs,modify_product);
                if(product_reference_number === product.product_reference_number){
                    const update_product = await getProduct(product.owner_reference_number);
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: update_product.documents,
                        message: "Product updated successfully."
                    }); 
                } 
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Product not found."
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