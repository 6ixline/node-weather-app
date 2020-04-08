const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message = document.querySelector('#location')
const message2 = document.querySelector('#forecast')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = address.value
    message.textContent = 'Loading...'
    message2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                message.textContent = data.error
            } else {
                message.textContent = data.location
                message2.textContent = data.forecast
            }

        })
    })
    address.value = ""
})