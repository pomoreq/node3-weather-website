const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express/static config config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Tomasz Pomorski'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Tomasz Pomorski'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'Tomasz Pomorski'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide adress'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            } 
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
if (!req.query.search) {
    return res.send({
        error: 'You must provide a search term'
    })
}

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        name: 'Tomasz Pomorski',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Tomasz Pomorski',
        errorMessage: 'page not found'
    })
   })


app.listen(port, () => {
    console.log('server is up on port ' + port)
})

