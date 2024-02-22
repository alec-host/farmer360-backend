//const { param } = require("express-validator");

const auth = require("../middleware/auth");

const uploadFile = require('../middleware/upload');
const createUserController = require("../controllers/create.user.controller");
const createBusinesssController = require("../controllers/create.business.controller");
const userLoginController = require("../controllers/user.login.controller");
const adminLoginController = require("../controllers/admin.login.controller");
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
const getFarmersHomePageController = require("../controllers/get.farmers.home.controller");
const updateBusinessProfileController = require("../controllers/update.business.controller");
const getWalletTransactionsController = require("../controllers/get.wallet.transactions.controller");
const createApiRequestController = require("../controllers/create.business.api.request.controller");
const createSurveyRequestController = require("../controllers/create.business.survey.request.controller");
const createNoteAndTagController = require("../controllers/create.business.tag.controller");
const updateBusinessDetailsController = require("../controllers/update.business.controller");
const deleteUserAccountController = require("../controllers/delete.user.controller");
const deleteBusinessAccountController = require("../controllers/delete.user.business.controller");
const getStoriesAdminController = require("../controllers/admin/get.stories.admin.controller");
const getCommentsAdminController = require("../controllers/admin/get.comments.admin.controller");
const getInboxAdminController = require("../controllers/admin/get.inbox.admin.controller");
const phoneNumberVerificationController = require("../controllers/phone.verify.controller");
const getServiceRequestsAdminController = require("../controllers/admin/get.service.request.admin.controller");
const getFarmersLimitedScopeAdminController = require("../controllers/admin/get.farmer.limited.scope.controller");
const getBusinessLimitedScopeAdminController = require("../controllers/admin/get.business.limited.scope.controller");
const getStatsAdminController = require("../controllers/admin/get.stats.admin.controller");
const getRangeStatsAdminController = require("../controllers/admin/get.stats.range.admin.controller");
const adminSuspendUserAccountController = require("../controllers/admin/user.suspend.controller");

const error = require("./error/error.routes");
/**
 * 
 * TO DO .. 
 * - add auth in the routes below.
 * 
 * Execute JWT method on login & for security save the generated token in a session rather than a localStorage.
 * 
 * auth is passed as shown below in a route:
 * 
 * route.post('/createNewUser',auth,createController.MyNewValue);
 * 
 */
module.exports = async(app) => {
    const router = require("express").Router();
    router.post('/createNewUser',createUserController.CreateNewUser);
    router.post('/createNewBusinessAccount',createBusinesssController.CreateNewBusinessAccount);
    router.post('/farmerLogin',userLoginController.UserLogin);
    router.post('/adminLogin',adminLoginController.AdminLogin);
    router.patch('/updateUserDetails',updateUserDetailsController.UpdateUserProfileDetails);
    router.patch('/updateUserDetailsFile',uploadFile.fields([{name:'id_file'},{name:'business_cert_file'}]),updateUserBusinesssDetailsController.UpdateUserBusinessDetails);
    router.patch('/changeUserProfile',updateUserDetailsController.UpdateUserProfileDetails);
    router.patch('/changeBusinessProfile',updateBusinessProfileController.UpdateBusinessProfileDetails);
    router.patch('/changeUserAccountPassword',updateUserDetailsController.UpdateUserProfileDetails);
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
    router.get('/getFarmersHomePage',getFarmersHomePageController.GetFarmersHomePage);
    router.get('/getWalletTransaction',getWalletTransactionsController.GetWalletTransactionByUserID);
    router.post('/createApiRequest',createApiRequestController.CreateNewApiRequest);
    router.post('/createSurveyRequestWithFile',uploadFile.single('file'),createSurveyRequestController.CreateNewSurveyRequest);
    router.post('/createSurveyRequest',createSurveyRequestController.CreateNewSurveyRequest);
    router.post('/createNoteAndTag',createNoteAndTagController.CreateNewNoteAndTag);
    router.patch('/changeBusinessAccountPassword',updateBusinessDetailsController.UpdateBusinessProfileDetails);
    router.patch('/deleteUserAccount',deleteUserAccountController.DeleteUserAccount);
    router.patch('/deleteBusinessAccount',deleteBusinessAccountController.DeleteUserBusinessAccount);
    router.patch('/verifyPhoneNumber',phoneNumberVerificationController.VerifyPhoneNumber);
    router.get('/adminGetAllStories',getStoriesAdminController.AdminGetAllStories);
    router.get('/adminGetAllComments',getCommentsAdminController.AdminGetAllComments);
    router.get('/adminGetAllInbox',getInboxAdminController.AdminGetInbox);
    router.get('/adminGetAllServiceRequests',getServiceRequestsAdminController.AdminGetAllServiceRequests);
    router.get('/adminGetFarmersLimitedScope',getFarmersLimitedScopeAdminController.AdminGetFarmerLimitedScope); 
    router.get('/adminGetBusinesslimitedScope',getBusinessLimitedScopeAdminController.AdminGetBusinessLimitedScope);
    router.get('/adminGetStats',getStatsAdminController.AdminGetStats);
    router.get('/adminGetRangeStats',getRangeStatsAdminController.AdminGetRangeStats);
    router.patch('/adminSuspendUserAccount',adminSuspendUserAccountController.SuspendUserAccount);

    app.use("/api/v1",router);
    app.use(error.errorHandler);
};