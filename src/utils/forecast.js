const request = require('request')

const forecast = (latitude, longitude,callback) =>{
    const url = `https://api.darksky.net/forecast/c0b08acf57de1a86b3b5afb71a3f21b7/${latitude},${longitude}`

    request({ url, json: true },(err, {body} = {})=>{
        if (err) {
            callback('Unable to connect to the weather service!',undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: Math.floor((body.currently.temperature - 32) * 5 / 9),
                precipProbability: body.currently.precipProbability,
                temperatureHigh: Math.floor((body.daily.data[0].temperatureHigh - 32) * 5 / 9),
                temperatureLow: Math.floor((body.daily.data[0].temperatureLow - 32) * 5 / 9)

            })
        }
    })
}

module.exports = forecast