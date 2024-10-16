const $ = (el) => document.querySelector(el)
const $fecha = $('#fecha')
const $ciudad = $('#ciudad')
const $temperatura = $('#temperatura')
const $imgClima = $('#imgClima')
const $clima = $('#clima')
const $humedad = $('#humedad')
const $vicibilidad = $('#vicibilidad')
const $viento = $('#viento')

//Fecha y Hora
const date = new Date()
$fecha.textContent =
  date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes()

//Clima Api OpenWeather
let lat = '-24.188654561006086'
let lon = '-65.300252137829'
let key = process.env.KEY_API
let lang = 'es'
let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`

async function getClima() {
  try {
    let response = await fetch(api)
    let ipResponse = await response.json()

    let name = ipResponse.name
    let country = ipResponse.sys.country
    $ciudad.textContent = name + ' - ' + country

    let temp = ipResponse.main.temp - 273.15 //cinvertir kelvin a celsius
    $temperatura.textContent = temp.toFixed(0) + '°C'

    let icon = ipResponse.weather[0].icon
    var img = `http://openweathermap.org/img/wn/${icon}@2x.png`
    $imgClima.src = img

    let main = ipResponse.weather[0].main
    let description = ipResponse.weather[0].description
    $clima.textContent = main + ' ' + description

    let humidity = ipResponse.main.humidity
    $humedad.textContent = 'Humedad: ' + humidity + '%'

    let visibility = ipResponse.visibility * 0.001 //convertir metros a kilometros
    $vicibilidad.textContent = 'Visibilidad: ' + visibility + 'Km'

    let wind = ipResponse.wind.speed
    $viento.textContent = 'Velocidad del viento: ' + wind + 'km/h'
  } catch {
    console.log('Algo paso, no se pudo resolver....')
  }
}

getClima()
