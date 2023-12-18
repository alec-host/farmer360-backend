const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.user.model');
const { mailSearch } = require('../model/search.email.model');
const { phoneSearch } = require('../model/search.phone.model');
const { encrypt } = require('../services/CRYPTO');

exports.CreateNewUser = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {first_name,last_name,email,entity_type,phone,country,date_created,password,subscription} = req.body;
    
        try{
            const email_found = await mailSearch(email);
            const phone_found = await phoneSearch(phone);
            if(email_found.total === 0){
                if(phone_found.total === 0){
                    const hashed_password = await encrypt(password);
                    const create_user = {
                                            first_name:first_name,
                                            last_name:last_name,
                                            reference_number:uuidv4(),
                                            entity_type:entity_type,
                                            email:email,
                                            msisdn:phone,
                                            country:country,
                                            date_created:date_created,
                                            password:hashed_password,
                                            subscription:subscription
                                        };
                    const user = await model.createNewUser(create_user);
                    if(phone === user.msisdn){
                        res.status(201).json({
                            success: true,
                            error: false,
                            message: "Registration complete."
                        }); 
                    } 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Phone is already taken."
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