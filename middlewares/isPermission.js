const Place = require('../models/place');
const Review = require('../models/review');

module.exports.isPermission = async (req, res, next) => {
    const {id} = req.params;
    let place = await Place.findById(id);

    if (!place.author.equals(req.user._id)) {
        req.flash('error_msg', 'You do not have permission to do that!');
        return res.redirect(`/places/${id}`);
    }
    next();
}

module.exports.isPermissionReview = async (req, res, next) => {
    const {placeId, reviewId} = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        req.flash('error_msg', 'You do not have permission to do that!');
        return res.redirect(`/places/${placeId}`);
    }
    next();
}

