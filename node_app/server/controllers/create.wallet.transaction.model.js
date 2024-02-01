const {v4:uuidv4} = require('uuid');
const { AppwriteException } = require('node-appwrite');
const { createNewWalletTransaction } = require('../model/create.wallet.transaction');
const { userSearch } = require('../model/search.user.model');

exports.CreateNewWalletTransaction = async(req,res) => {
    if(Object.keys(req.body).length !== 0){
        const {reference_number,cr,dr,running_balance,particulars,date_created} = req.body;
    
        try{
            const user_found = await userSearch(reference_number);
            if(user_found.total === 1){
                const create_transaction = {
                                                transaction_uuid:uuidv4(),
                                                cr:cr,
                                                dr:dr,
                                                running_balanc:running_balance,
                                                particulars:particulars,
                                                date_created:date_created
                                            };
                const transaction = await createNewWalletTransaction(create_transaction);
                if(reference_number === transaction.reference_number){
                    res.status(201).json({
                        success: true,
                        error: false,
                        message: "Transaction logged."
                    }); 
                }
            }else{
                res.status(200).json({
                    success: false,
                    error: true,
                    message: "User does not exist."
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