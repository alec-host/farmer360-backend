const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const model = require('../model/create.business.model');
const { mailBusinessSearch } = require('../model/search.email.business.model');
const { phoneBusinessSearch } = require('../model/search.phone.business.model');
const { encrypt } = require('../services/CRYPTO');

exports.CreateNewBusinessAccount = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        console.log(req.body);
        const {business_name,email,phone,owner_full_name,subscription,city,country,password,date_created} = req.body;

        try{
            const email_found = await mailBusinessSearch(email);
            const phone_found = await phoneBusinessSearch(phone);
            if(email_found.total === 0){
                if(phone_found.total === 0){
                    const hashed_password = await encrypt(password);
                    const create_user = {
                                            business_uuid:'BIZ_'+uuidv4(),
                                            business_name:business_name,
                                            email:email,
                                            phone:phone,
                                            owner_full_name:owner_full_name,
                                            subscription:subscription,
                                            city:city,
                                            country:country,
                                            password:hashed_password,
                                            date_created:date_created
                                        };

                    const user = await model.createNewBusinessAccount(create_user);
                    console.log(user);
                    if(phone === user.phone){
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
            message: "Missing: request payload not provided kkkk."
        }); 
    }
};