const Place = require('../models/place');
const Review = require('../models/review');


module.exports.store = async (req, res) => {
    const {placeId} = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const place = await Place.findById(placeId);

    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash('success_msg', 'Successfully made a new review!');
    res.redirect(`/places/${placeId}`);
}

module.exports.destroy = async (req, res) => {
    const {placeId, reviewId} = req.params;
    await Place.findByIdAndUpdate(placeId, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success_msg', 'Successfully deleted a review!');
    res.redirect(`/places/${placeId}`);
}