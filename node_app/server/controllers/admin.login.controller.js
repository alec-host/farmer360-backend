const { AppwriteException } = require('node-appwrite');
const { adminAuthentication } = require('../model/admin.login.model');

const { compare } = require('bcrypt');

exports.AdminLogin = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {username,password} = req.body;
        try{
            console.log(username);
            const admin_found = await adminAuthentication();
            
            const allowed_access = await compare(password.trim(),JSON.parse(admin_found)[0].password.toString());

            if(allowed_access){
                res.status(200).json({
                    success: true,
                    error: false,
                    data: JSON.parse(admin_found),
                    message: "Login Successful"
                });                   
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "Incorrect Credentials"
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