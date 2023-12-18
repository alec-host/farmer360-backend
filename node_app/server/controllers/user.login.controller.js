const { AppwriteException } = require('node-appwrite');
const { compare } = require('bcrypt');
const { mailSearch } = require('../model/search.email.model');

exports.UserLogin = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {username,password} = req.body;
        try{
            const found = await mailSearch(username);
            console.log(found);
            if(found.total == 1){
                const allowed_access = await compare(password,found?.documents[0]?.password);
                if(allowed_access){
                    console.log("Login Successful");
                    console.log("after pass ");
                    console.log(allowed_access);
                    console.log(found?.documents[0].$databaseId);
                    console.log(found?.documents[0].$collectionId);
                    console.log(found?.documents[0].$id);
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