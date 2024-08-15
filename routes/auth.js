const express = require('express');
const Place = require('../models/place');
const {placeSchema} = require('../schemas/places');
const authController = require('../controllers/auth');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');



router.get('/register', authController.registerform);

router.post('/register', wrapAsync(authController.register));

router.get('/login', authController.loginform);


router.post('/login', passport.authenticate('local', 
    {
        failureRedirect: '/login',
        failureFlash: {
            type: 'error_msg',
            message: 'Invalid username or password'
        },
    }
), authController.login);

router.post('/logout', authController.logout);

module.exports = router;