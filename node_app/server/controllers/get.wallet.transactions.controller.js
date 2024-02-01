const { AppwriteException } = require('node-appwrite');
const model = require('../model/update.shop.model');
const { userSearch } = require('../model/search.user.model');
const { getWalletTransactionByUserID } = require('../model/get.wallet.transaction');

exports.GetWalletTransactionByUserID = async(req,res) => {
    const {owner_reference_number} = req.query;
    if(owner_reference_number){ 
        try{
            const user_found = await userSearch(owner_reference_number);
            if(user_found.total === 1){
                transaction_found = await getWalletTransactionByUserID(owner_reference_number);
                if(owner_reference_number === transaction_found.documents[0].reference_number){
                    res.status(200).json({
                        success: true,
                        error: false,
                        data: transaction_found.documents,
                        message: "Transaction found."
                    });
                }
            }else{
                res.status(404).json({
                    success: false,
                    error: true,
                    message: "User not found."
                }); 
            }
        }catch(e){
            if(e instanceof AppwriteException){
                console.log(e);
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