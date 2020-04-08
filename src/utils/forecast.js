const request = require('request')

const forecast = (latitude, longitude,callback) =>{
    const url = `https://api.darksky.net/forecast/c0b08acf57de1a86b3b5afb71a3f21b7/${latitude},${longitude}`

    request({ url, json: true },(err, {body} = {})=>{
        if (err) {
            callback('Unable to connect to the weather service!',undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast