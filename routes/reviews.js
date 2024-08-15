const express = require('express');
const Place = require('../models/place');

const reviewController = require('../controllers/reviews');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const {validateReview} = require('../middlewares/validator');
const isValidObjectId = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const {isPermissionReview} = require('../middlewares/isPermission');

const router = express.Router({mergeParams: true});




router.post('/', isAuth, isValidObjectId('/places'), validateReview, wrapAsync(reviewController.store));

router.delete('/:reviewId', isAuth, isPermissionReview, isValidObjectId('/places'), wrapAsync(reviewController.destroy));

module.exports = router;