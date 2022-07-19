const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const authController = require('../controller/authController');
const middleware = require('../controller/middleware');
 router.post('/register',authController.registerUser);
 router.post('/login', authController.loginUser);
// router.post('/logout',middleware.verifyToken,authController.userLogout);
 module.exports = router;