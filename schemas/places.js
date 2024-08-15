const joi = require('joi');

module.exports.placeSchema = joi.object({
    place: joi.object({
        title: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        location: joi.string().min(0).required(),
        
    }).required()
});

