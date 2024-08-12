const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const joi = require('joi');
const wrapAsync = require('./utils/wrapAsync');
const ErrorHandler = require('./utils/ErrorHandler');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//schema
const {placeSchema} = require('./schemas/places');

//middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

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

//connect to the database
mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then(()=> {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

//models
const Place = require('./models/place');
const { title } = require('process');



//routes

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/places', wrapAsync(async (req, res) => {
   const places = await Place.find({});
   res.render('places/index', {places});
}));

app.get('/places/create', (req, res) => {
    res.render('places/create');
});



app.get('/places/:id', wrapAsync( async (req,res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/show', {place});
}));


app.post('/places', validatePlace,  wrapAsync(async (req, res, next) => {
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
    res.redirect(`/places/${place._id}`);
}));


app.get('/places/:id/edit', wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render('places/edit', {place});
}));

app.put('/places/:id', validatePlace, wrapAsync(async (req, res) => {
	await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
	res.redirect('/places');
}))

app.delete('/places/:id', wrapAsync(async (req, res) => {
    await Place.findByIdAndDelete(req.params.id);
    res.redirect('/places');
}));

app.get('/seed/place', wrapAsync(async (req, res) => {
    const place = new Place({
        title: 'Best Place',
        price: '100',
        description: 'This is the best place to be',
        location: 'Nairobi'
    });
    await place.save();
    res.send('Place created');
}));


app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page not found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong';
    console.log(req.originalUrl);
    res.status(statusCode).render('error', {err});

})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

