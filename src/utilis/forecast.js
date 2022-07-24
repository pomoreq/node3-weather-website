const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c4252ccc1bc4829b6b4ff938cfcf3cd9&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather serive!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'degrees out. It feels like ' + body.current.feelslike + 'deegres out' )
        }
    })
    
}









module.exports = forecast