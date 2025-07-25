const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/movieReview')

var reviewSchema = mongoose.Schema({
    name: String,
    rating: Number,
    review: String
})

module.exports = {reviewData: mongoose.model('reviews', reviewSchema)}