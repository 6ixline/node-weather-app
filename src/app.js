const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory for serve
app.use(express.static(publicDirectoryPath))

app.use(express.json())

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: "Sourabh"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Sourabh',
        message:'Help page Created..'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sourabh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You have to provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (err, { summary, temperature, precipProbability, temperatureHigh, temperatureLow} = {}) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                location: location,
                forecast: {
                    summary,
                    temperature,
                    precipProbability,
                    temperatureHigh,
                    temperatureLow
                },
            })
          
        })
    })

   
})

app.get('/weather/:lat,:long',async(req,res)=>{

    geocode(`${req.params.lat},${req.params.long}`,(err,data)=>{
        const location = 'Your Location'
        if(!err){
            location = data.location
        }

        forecast(req.params.lat, req.params.long, (err, forecast) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                forecast,
                location
            })
        })
    })
    
       
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name: 'Sourabh',
        error: 'Help article not Found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Sourabh',
        error:'Page not Found',
        title:'404 Page'
    })
})


app.listen(port,()=>{
    console.log(`server is running on port no ${port}`)
})
