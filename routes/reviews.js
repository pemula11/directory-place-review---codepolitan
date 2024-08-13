const express = require('express');
const Place = require('../models/place');
const {reviewSchema} = require('../schemas/reviews');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const isValidObjectId = require('../middleware/isValidObjectId');

const router = express.Router({mergeParams: true});

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    }
    else {
        next();
    }
}


router.post('/', isValidObjectId('/places'), validateReview, wrapAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const {placeId} = req.params;
    const place = await Place.findById(placeId);
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash('success_msg', 'Successfully made a new review!');
    res.redirect(`/places/${placeId}`);
}));

router.delete('/:reviewId', isValidObjectId('/places'), wrapAsync(async (req, res) => {
    const {placeId, reviewId} = req.params;
    await Place.findByIdAndUpdate(placeId, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success_msg', 'Successfully deleted a review!');
    res.redirect(`/places/${placeId}`);
}));

module.exports = router;