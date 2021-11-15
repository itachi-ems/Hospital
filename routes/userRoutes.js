const express = require('express');

const authController = require('../controller/authController');

const router =express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.login);
router.route('/resetPassword').post(authController.login);

module.exports=router;