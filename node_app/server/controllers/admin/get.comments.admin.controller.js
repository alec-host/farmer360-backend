const { AppwriteException } = require('node-appwrite');
const { getAllComments } = require('../../model/get.comments.all.model');

exports.AdminGetAllComments = async(req,res) => {
    const {reference_number} = req.query;
    if(reference_number){ 
        try{
            //const user_found = await userSearch(owner_reference_number);
            //if(user_found.total === 1){
                //if(owner_reference_number === user_found.documents[0]?.reference_number){
                    const comments_found = await getAllComments(1);
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: comments_found.documents,
                        message: "Comments list with a size:-"+comments_found.total
                    });
                //} 
            //}else{
            //    res.status(200).json({
            //        success: false,
            //        error: true,
            //        message: "User does not exist."
            //    });            
            //}
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