const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: String,
    rating: String,
    description: {
        type:String,
        maxLength: 220
    },
    releaseDate: {
        type:String,
        default:"Coming soon..."
    },
    runningTime: Number,
    director:String,
    cast:[{type:String}],
    posterLink: {
        type:String,
    },
    trailerLinks:{
        type:[String],
        default:[]
    }
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
