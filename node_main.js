const bodyParser = require('body-parser')
const {reviewData} = require('./database')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/god', (req, res) => {
    res.render('god')
})

app.get('/kung_fu_panda_4', (req, res) => {
    res.render('kung_fu_panda_4')
})

app.get('/dune_part_2', (req, res) => {
    res.render('dune_part_2')
})

app.get('/1917', (req, res) => {
    res.render('1917')
})

app.get('/oppenheimer', (req, res) => {
    res.render('oppenheimer')
})

app.get('/stranger_things', (req, res) => {
    res.render('stranger_things')
})

app.get('/game_of_thrones', (req, res) => {
    res.render('game_of_thrones')
})

app.get('/last_of_us', (req, res) => {
    res.render('last_of_us')
})

app.get('/breaking_bad', (req, res) => {
    res.render('breaking_bad')
})

app.post('/submit_review', async (req, res) => {
    var {movie, rating, reviewText} = req.body
    console.log(movie)
    console.log(reviewText)
    console.log(rating)
    await reviewData.create({
        name: movie,
        rating: rating,
        review: reviewText
    })
    res.redirect("/")
})

app.listen(3001)