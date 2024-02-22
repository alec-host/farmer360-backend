const { AppwriteException } = require('node-appwrite');
const { compare } = require('bcrypt');
const { mailSearch } = require('../model/search.email.model');
const { mailBusinessSearch } = require('../model/search.email.business.model');

exports.UserLogin = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {username,password,account_type} = req.body;
        try{

            let found = {};

            switch(''+account_type.trim()){
                case "farmer": 
                    found = await mailSearch(username);
                break;
                case "business": 
                    found = await mailBusinessSearch(username);
                break;
                default:
                break;
            }

            if(found.total == 1){
                const allowed_access = await compare(password,found?.documents[0]?.password);
                if(allowed_access){
                    if(found?.documents[0]?.is_deleted === 0){
                        res.status(200).json({
                            success: true,
                            error: false,
                            data: found.documents,
                            message: "Login Successful"
                        });  
                    }else{
                        res.status(200).json({
                            success: false,
                            error: true,
                            message: "Account does not exist."
                        });                        
                    }                 
                }else{
                    res.status(200).json({
                        success: false,
                        error: true,
                        message: "Incorrect Credentials"
                    });                      
                }
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Email does not Exist"
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
            message: "Attention: Something Wrong has Happened."
        }); 
    }
};