const express = require('express');
const Place = require('../models/place');
const {placeSchema} = require('../schemas/places');
const wrapAsync = require('../utils/wrapAsync');
const ErrorHandler = require('../utils/ErrorHandler');
const  isValidObjectId  = require('../middleware/isValidObjectId');

const router = express.Router();

const validatePlace = (req, res, next) => {
    const {error} = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new ErrorHandler(msg, 400));
    }
    else {
        next();
    }
}

router.get('/', wrapAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', {places});
 }));
 
 router.get('/create', (req, res) => {
     res.render('places/create');
 });
 
 
 
 router.get('/:id', isValidObjectId('/places'), wrapAsync( async (req,res) => {
     const place = await Place.findById(req.params.id).populate('reviews');
     res.render('places/show', {place});
 }));
 
 
 router.post('/', validatePlace,  wrapAsync(async (req, res, next) => {
     // const placeSchema = joi.object({
     //     place: joi.object({
     //         title: joi.string().required(),
     //         price: joi.number().required(),
     //         description: joi.string().required(),
     //         location: joi.string().min(0).required(),
     //         image: joi.string().required()
     //     }).required()
     // });
     // const {error} = placeSchema.validate(req.body);
     // if (error) {
     //     console.log(error);
     //     return next(new ErrorHandler(error, 400));
     // }
 
     const place = new Place(req.body.place);
     await place.save();
     req.flash('success_msg', 'Successfully made a new place!');
     res.redirect(`/places/${place._id}`);
 }));
 
 
 router.get('/:id/edit', isValidObjectId('/places'),  wrapAsync(async (req, res) => {
     const place = await Place.findById(req.params.id);
     res.render('places/edit', {place});
 }));
 
 router.put('/:id', isValidObjectId('/places'), validatePlace, wrapAsync(async (req, res) => {
     await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
     req.flash('success_msg', 'Successfully updated place!');
     res.redirect('/places');
 }))
 
 router.delete('/:id', isValidObjectId('/places'), wrapAsync(async (req, res) => {
     await Place.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Successfully deleted place!');
     res.redirect('/places');
 }));

module.exports = router;