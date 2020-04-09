const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message = document.querySelector('#location')
const mainDiv = document.querySelector('.main-content')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = address.value

    message.textContent = 'Loading...'

    if(document.querySelector('.temp')){
        mainDiv.removeChild(document.querySelector('.temp'))
        mainDiv.removeChild(document.querySelector('.summary'))
        mainDiv.removeChild(document.querySelector('.temperatureHigh'))

    }
    



   
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                message.textContent = data.error
            } else {
                message.textContent = data.location
                // temparature element
                const temp = document.createElement('p')
                temp.textContent = data.forecast.temperature+'\u00B0'
                temp.setAttribute('class','temp')
                mainDiv.appendChild(temp)
                // Summary element
                const summary = document.createElement('p')
                summary.textContent = data.forecast.summary + " Rain Probability: " + data.forecast.precipProbability + '%'
                summary.setAttribute('class', 'summary')
                mainDiv.appendChild(summary)

                // temparature high and low element
                const temperatureHigh = document.createElement('p')
                temperatureHigh.textContent = 'Temprature High: '+ data.forecast.temperatureHigh + '\u00B0,' + " Temparature Low: " + data.forecast.temperatureLow + '\u00B0'
                temperatureHigh.setAttribute('class', 'temperatureHigh')
                mainDiv.appendChild(temperatureHigh)
                
                
            }

        })
    })
    address.value = ""
})