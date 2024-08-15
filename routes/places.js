const express = require('express');
const Place = require('../models/place');
const PlaceController = require('../controllers/places');
const wrapAsync = require('../utils/wrapAsync');
const  isValidObjectId  = require('../middlewares/isValidObjectId');
const isAuth = require('../middlewares/isAuth');
const {isPermission} = require('../middlewares/isPermission');
const {validatePlace} = require('../middlewares/validator');
const upload = require('../config/multer')

const router = express.Router();



router.route('/')
    .get(wrapAsync(PlaceController.index))
    .post(isAuth, upload.array('image', 5), validatePlace,  wrapAsync(PlaceController.store));
   

 
 router.get('/create', isAuth, (req, res) => {
     res.render('places/create');
 });
 
 
 router.route('/:id')
    .get( isValidObjectId('/places'), wrapAsync( PlaceController.show))
    .put( isAuth, isValidObjectId('/places'), isPermission, upload.array('image', 5), validatePlace, wrapAsync(PlaceController.update))
    .delete( isAuth, isValidObjectId('/places'), wrapAsync(PlaceController.destroy));

router.get('/:id/edit', isAuth, isValidObjectId('/places'), isPermission,  wrapAsync(PlaceController.edit));

router.delete('/:id/image', isAuth, isValidObjectId('/places'), isPermission, wrapAsync(PlaceController.destroyImage));

module.exports = router;