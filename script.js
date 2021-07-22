
const API_URL = 'https://geo.ipify.org/api/v1?apiKey=at_t1DMzXX0OEPTD4dWupswn4yBrPt2E'
const SEARCH_API = 'https://geo.ipify.org/api/v1?apiKey=at_t1DMzXX0OEPTD4dWupswn4yBrPt2E&ipAddress='
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const mapEl = document.getElementById('mapid')
const body = document.body


getData(API_URL)

async function getData(url) {
    const res = await fetch(url)
    const data = await res.json()
    showData(data)
}


function showData(result) {
    const {ip, location, isp, as} = result
    main.innerHTML = `
    <div class="result">
      <p>IP Address</p>
      <h3>${ip}</h3>
    </div>
    <div class="result">
      <p>Location</p>
      <h3>${location.region}</h3>
    </div>
    <div class="result">
      <p>Timezone</p>
      <h3>${location.timezone} ${location.postalCode}</h3>
    </div>
    <div class="result last">
      <p>Isp</p>
      <h3>${isp}</h3>
    </div>
    `
    
    var mymap = L.map(mapEl).setView([location.lat, location.lng], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG15dHJvMjUiLCJhIjoiY2tyZXNkeW53MXVsYTJwcXV2M213ZzBkcSJ9.2xOT6OUbBz-GVP7-cyiJnw'
    }).addTo(mymap);
    var marker = L.marker([location.lat, location.lng]).addTo(mymap);
    
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getData(SEARCH_API + searchTerm)
        
        search.value = ''
    } else {
        window.location.reload()
    }
})