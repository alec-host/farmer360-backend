const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const { productSearch } = require('../model/search.product.model');
const { createNewProduct } = require('../model/create.product.model');
const { getProduct } = require('../model/get.product.model');
const { mediaFileupload } = require('../services/BUCKET.STORE');
const { APP_WRITE_PROJECT_ID, APP_WRITE_BUCKET_ID } = require('../constants/constants');

exports.CreateNewProduct = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {product_name,product_price,product_qty,description,original_file_name,shop_uuid,owner_reference_number,date_created} = req.body;
        
        try{   
            
            console.log(req.file.filename);
            console.log(req.file.path);
            console.log(original_file_name);
            const file_upload = await mediaFileupload(req.file.path,original_file_name);
          
            if(file_upload.chunksUploaded >= 1){
                const image_url = `https://cloud.appwrite.io/v1/storage/buckets/${APP_WRITE_BUCKET_ID}/files/${file_upload.$id}/view?project=${APP_WRITE_PROJECT_ID}&mode=admin`;

                const product = {
                                    product_reference_number:"PRD"+uuidv4(),
                                    product_name:product_name,
                                    price:product_price,
                                    quantity:product_qty,
                                    description:description,
                                    image_url:image_url,
                                    shop_reference_number:shop_uuid,
                                    owner_reference_number:owner_reference_number,
                                    date_created:date_created
                                };
                                
                const exist = await productSearch(product.product_reference_number);                 
                if(exist.total === 0){              
                        const created_product = await createNewProduct(product);
                        if(product.owner_reference_number === created_product.owner_reference_number){
                            const product_found = await getProduct(product.owner_reference_number);
                            console.log(product_found);
                            res.status(201).json({
                                success: true,
                                error: false,
                                data: product_found.documents,
                                message: "Product created successfully."
                            }); 
                        } 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Product not found."
                    }); 
                }
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