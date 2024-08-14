const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const joi = require('joi');
const wrapAsync = require('./utils/wrapAsync');
const ErrorHandler = require('./utils/ErrorHandler');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const User = require('./models/user');

//middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//connect to the database
mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then(()=> {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

//models


const { title } = require('process');



//routes
app.get('/', (req, res) => {
    res.render('home');
});



app.use('/', require('./routes/auth'));
app.use('/places', require('./routes/places'));
app.use('/places/:placeId/reviews', require('./routes/reviews'));


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

