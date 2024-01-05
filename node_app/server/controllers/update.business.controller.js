const { AppwriteException } = require('node-appwrite');
const { phoneBusinessSearch } = require('../model/search.phone.business.model');
const { mailBusinessSearch } = require('../model/search.email.business.model');
const { updateBusinessDetails } = require('../model/update.business.model');
const { encrypt } = require('../services/CRYPTO');

exports.UpdateBusinessProfileDetails = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
       
        const { action,phone,email,database_id,table_id,record_id } = req.body;
        let data = {};
        let json = {};

        switch(action){
            case "profile":
                data = {gender,age_bracket,education_level,farmed_items,is_profile_completed} = req.body;
                json = {gender,age_bracket,education_level,farmed_items,is_profile_completed};
            break;
            case "demographic_1":
                data = {age_bracket} = req.body;
                json = {age_bracket};
            break;
            case "demographic_2":
                data = {education_level} = req.body;
                json = {education_level};
            break;            
            case "contact":
                data = {first_name,last_name} = req.body;
                json = {first_name,last_name};
            break;
            case "location":
                data = {city,country} = req.body;
                json = {city,country};
            break;
            case "pass":
                data = {password,confirm_password} = req.body;
                if(password !== confirm_password){
                    json = {password,confirm_password}; //-.trigger an error for non existant column.
                }else{
                    const hashed_password = await encrypt(password);
                    json = {password:hashed_password};
                }   
            break;
        };

        console.log('sssssssssssssssssssssssssssssssssssssss');
        console.log(data);

        try{

            const phone_found = await phoneBusinessSearch(phone);
            const email_found = await mailBusinessSearch(email);

            const db_configs = {database_id,table_id,record_id};
            
            if(phone_found.total == 1){
                if(email_found.total == 1){
                    const user = await updateBusinessDetails(db_configs,json);
                    const updated_data = await mailBusinessSearch(user.email);
                    console.log(updated_data);
                    console.log('ttttttttttttttttttttttttttttttttttt');
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: updated_data.documents,
                        message: "Update was successful."
                    }); 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Email not found."
                    }); 
                }
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Phone not found."
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