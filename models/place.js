const { types, ref } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const User = require('./user');

const placeSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [
        {
            url: String,
            filename: String
        }
    ],
    author: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

placeSchema.post('findOneAndDelete', async function(place){
    if (place) {
        await Review.deleteMany({ _id: { $in: place.reviews}})
    }
})

module.exports = mongoose.model('Place', placeSchema);