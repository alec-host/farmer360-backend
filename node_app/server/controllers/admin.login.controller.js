const { AppwriteException } = require('node-appwrite');
//const { compare } = require('bcrypt');;

exports.AdminLogin = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {username,password} = req.body;
        try{
            //const allowed_access = await compare(password,found?.documents[0]?.password);
            const allowed_access = 1;
            if(allowed_access){
                console.log("Login Successful");
                console.log("after pass ");
                console.log(allowed_access);
                res.status(200).json({
                    success: true,
                    error: false,
                    data: [],
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