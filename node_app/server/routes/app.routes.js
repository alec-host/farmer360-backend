//const { param } = require("express-validator");

const auth = require("../middleware/auth");
const uploadFile = require('../middleware/upload');
const createUserController = require("../controllers/create.user.controller");
const createBusinesssController = require("../controllers/create.business.controller");
const userLoginController = require("../controllers/user.login.controller");
const updateUserDetailsController = require("../controllers/update.user.controller");
const updateUserBusinesssDetailsController = require("../controllers/update.user.business.controller");
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
const getCommentsController  = require("../controllers/get.comments.controller");
const getAllCommentsController = require("../controllers/get.comments.all.controller");
const getAllFarmersController = require("../controllers/get.farmers.controller");
const updateBusinessProfileController = require("../controllers/update.business.controller");

const error = require("./error/error.routes");
/**
 * 
 * TO DO .. add auth in the routes below.
 * Implement JWT method on login & for security save the generated token in a session rather than a localStorage.
 * 
 * auth is passed as shown below in a route:
 * 
 * route.post('/myRoute',auth,createController.MyNewValue);
 * 
 */
module.exports = async(app) => {
    const router = require("express").Router();
    router.post('/createNewUser',createUserController.CreateNewUser);
    router.post('/createNewBusinessAccount',createBusinesssController.CreateNewBusinessAccount);
    router.post('/farmerLogin',userLoginController.UserLogin);
    router.patch('/updateUserDetails',updateUserDetailsController.UpdateUserProfileDetails);
    router.patch('/updateUserDetailsFile',uploadFile.fields([{name:'id_file'},{name:'business_cert_file'}]),updateUserBusinesssDetailsController.UpdateUserBusinessDetails);
    router.patch('/changeUserProfile',updateUserDetailsController.UpdateUserProfileDetails);
    router.patch('/changeBusinessProfile',updateBusinessProfileController.UpdateBusinessProfileDetails);
    router.patch('/changeUserPassword',updateUserDetailsController.UpdateUserProfileDetails);
    router.patch('/changeUserDemographicData',updateUserDetailsController.UpdateUserProfileDetails);
    router.post('/createNewShop',createShopController.CreateNewShop);
    router.patch('/modifyShop',updateShopController.ModifyShop);
    router.post('/addProduct',uploadFile.single('file'),createNewProductController.CreateNewProduct);
    router.get('/getShop/',getShopController.GetShop);
    router.get('/getProduct/',getProductController.GetProduct);
    router.patch('/modifyProduct',updateProductController.ModifyProduct);
    router.post('/createNewInbox',createInboxController.CreateNewInbox);
    router.get('/getInbox/',getInboxController.GetInbox);
    router.post('/createStoryFile',uploadFile.single('file'),createStoryController.CreateNewStory);
    router.post('/createStoryText',createStoryController.CreateNewStory);
    router.get('/getStory/',getStoryController.GetStory);
    router.get('/getStories/',getStoriesController.GetStories);
    router.get('/getProducts/',getProductsController.GetProducts);
    router.get('/getProductByID/',getProductByIDController.GetProductByID);
    router.post('/createNewComment',createCommentController.CreateNewComment);
    router.get('/getComments',getCommentsController.GetComments);
    router.get('/getAllComments',getAllCommentsController.GetAllComments);
    router.get('/getAllFarmers',getAllFarmersController.GetFarmers);

    app.use("/api/v1",router);
    app.use(error.errorHandler);
};