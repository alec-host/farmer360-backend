const multer = require('multer');
const path = require('path');

const { param } = require("express-validator");

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const createUserController = require("../controllers/create.user.controller");
const userLoginController = require("../controllers/user.login.controller");
const updateUserDetailsController = require("../controllers/update.user.controller");
const createShopController = require("../controllers/create.shop.controller");
const updateShopController = require("../controllers/update.shop.controller");
const createNewProductController = require("../controllers/create.product.controller");
const updateProductController = require("../controllers/update.product.controller");
const getShopController = require("../controllers/get.shop.controller");
const getProductController = require("../controllers/get.product.controller");
const createInboxController = require("../controllers/create.inbox.controller");
const getInboxController = require("../controllers/get.inbox.controller");
const createStoryController = require("../controllers/create.story.controller");
const getStoryController = require("../controllers/get.story.controller");
const getStoriesController = require("../controllers/get.stories.controller");
const getProductsController = require("../controllers/get.products.controller");
const getProductByIDController = require("../controllers/get.product.id.controller");
const createCommentController = require("../controllers/create.comment.controller");

const error = require("./error/error.routes");

module.exports = async(app) => {

    const router = require("express").Router();

    router.post('/createNewUser',createUserController.CreateNewUser);
    router.post('/farmerLogin',userLoginController.UserLogin);
    router.patch('/updateUserDetails',updateUserDetailsController.UpdateUserDetails);
    router.patch('/updateUserDetailsFile',updateUserDetailsController.UpdateUserDetails);
    router.patch('/changeUserName',updateUserDetailsController.UpdateUserDetails);
    router.patch('/changeUserPassword',updateUserDetailsController.UpdateUserDetails);
    router.patch('/changeUserDemographicData',updateUserDetailsController.UpdateUserDetails);
    router.post('/createNewShop',createShopController.CreateNewShop);
    router.patch('/modifyShop',updateShopController.ModifyShop);
    router.post('/addProduct',upload.single('file'),createNewProductController.CreateNewProduct);
    router.get('/getShop/',getShopController.GetShop);
    router.get('/getProduct/',getProductController.GetProduct);
    router.patch('/modifyProduct',updateProductController.ModifyProduct);
    router.post('/createNewInbox',createInboxController.CreateNewInbox);
    router.get('/getInbox/',getInboxController.GetInbox);
    router.post('/createStoryFile',upload.single('file'),createStoryController.CreateNewStory);
    router.post('/createStoryText',createStoryController.CreateNewStory);
    router.get('/getStory/',getStoryController.GetStory);
    router.get('/getStories/',getStoriesController.GetStories);
    router.get('/getProducts/',getProductsController.GetProducts);
    router.get('/getProductByID/',getProductByIDController.GetProductByID);
    router.post('/createNewComment',createCommentController.CreateNewComment);

    app.use("/api/v1",router);
    app.use(error.errorHandler); 

};