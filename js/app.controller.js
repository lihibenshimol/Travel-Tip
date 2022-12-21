import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            //todo add a renderLocs function 
            var strHTML = locs.map(location => {
                return `
                <li class="savedLoc" onclick="onPanTo(${location.lat},${location.lng})">
                <span> ${location.name} </span> <br>
                Created at: ${location.createdAt} <br>
                ID: ${location.id}
                </li>
                `
            }).join('')
            document.querySelector('.locs').innerHTML = strHTML
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            //DONE show user location on map with initmap + show location
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat, lng) {
    mapService.panTo(lat, lng)
    console.log('Panning the Map')
}


function onSearch(ev) {
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]').value
    const address = elInputSearch.split(' ').join('20%')
    mapService.search(address)
//todo add ad addLocation function
}