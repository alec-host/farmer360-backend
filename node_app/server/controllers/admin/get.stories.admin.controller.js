const { AppwriteException } = require('node-appwrite');
const { getAllStories } = require('../../model/get.stories.all.model');

exports.AdminGetAllStories = async(req,res) => {
    const {reference_number} = req.query;
    if(reference_number){ 
        try{
            //const user_found = await userSearch(owner_reference_number);
            //if(user_found.total === 1){
                //if(owner_reference_number === user_found.documents[0]?.reference_number){
                    const stories_found = await getAllStories(1);
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: stories_found.documents,
                        message: "Stories list with a size:-"+stories_found.total
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