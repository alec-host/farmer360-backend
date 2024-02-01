const { AppwriteException } = require('node-appwrite');
const { userSearch } = require('../model/search.user.model');
const { getProducts } = require('../model/get.products.model');

exports.GetProducts = async(req,res) => {
    const {reference_number,email,_page,_limit} = req.query;
    if(reference_number){ 
        try{
            const user_found = await userSearch(reference_number);
            if(user_found.total === 1){
                if(reference_number === user_found.documents[0]?.reference_number){
                    let products_found = {};
                    let _last_id = '0';
                    if(parseInt(_page) >= 1){
                        if(parseInt(_page) > 1){
                            const pageOne = await getProducts(parseInt(_limit),_last_id);
                            _last_id = pageOne.documents[pageOne.documents.length - 1].$id;
                        }else{
                            _last_id = '0';
                        }
                        products_found = await getProducts(parseInt(_limit),_last_id);
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: products_found.documents,
                            message: "Products list with a size:-"+products_found.total
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
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User does not exist."
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