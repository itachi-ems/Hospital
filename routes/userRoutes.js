const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router =express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login); 
router.route('/getAllUsers').get(userController.getAllUsers); 

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.route('/updateMyPassword').patch(authController.protect,authController.updatePassword);
router.route('/updateMe').patch(authController.protect,userController.updateMe)
router.route('/deleteMe').delete(authController.protect,userController.deleteMe)

module.exports=router;  