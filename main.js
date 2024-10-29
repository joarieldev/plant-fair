const $ = (el) => document.querySelector(el)
const $fecha = $('#fecha')
const $ciudad = $('#ciudad')
const $temperatura = $('#temperatura')
const $imgClima = $('#imgClima')
const $clima = $('#clima')
const $humedad = $('#humedad')
const $viento = $('#viento')
const $$ = (el) => document.querySelectorAll(el)
const $links = $$('[data-name="navLink"]')
const $sections = $$('.sub-container')

//Fecha y Hora
const date = new Date()
$fecha.textContent =
  date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes()

//Clima Api OpenWeather
import API_KEY from './config.js'
let lat = '-24.188654561006086'
let lon = '-65.300252137829'
let key = API_KEY
let lang = 'es'
let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`

async function getClima() {
  console.log($fecha)
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

    let wind = ipResponse.wind.speed
    $viento.textContent = 'Velocidad del viento: ' + wind + 'km/h'
  } catch {
    console.log('Algo paso, no se pudo resolver....')
  }
}

getClima()

window.addEventListener('scroll', activeLink)

function activeLink() {
  let current = 'inicio'
  $sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if(this.scrollY >= sectionTop) {
      current = section.getAttribute('id')
    }
  })
  $links.forEach((link) => {
    link.classList.remove('active')
    if(link.href.includes(current)) {
      link.classList.add('active')
    }
  })
}