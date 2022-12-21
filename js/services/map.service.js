export const mapService = {
    initMap,
    addMarker,
    panTo,
    search
}

// const API_KEY = 'AIzaSyB4O57BhI5-NEa91dIdJp0kZQWc81W6Q48'
// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener("click", onClickMap)
            addMarker({lat, lng})
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
    addMarker({lat, lng})
    initMap(lat, lng)
    //todo add a search input and use google geocode to can location lat lng
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB4O57BhI5-NEa91dIdJp0kZQWc81W6Q48'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function search(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB4O57BhI5-NEa91dIdJp0kZQWc81W6Q48`)
    .then(res => {
        const lat = res.data.results[0].geometry.location.lat
        const lng = res.data.results[0].geometry.location.lng
        panTo(lat, lng)
    })


}

function onClickMap(ev){
        const loc = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
        // time: createFormatedDate(Date.now())
    }
    initMap(loc.lat,loc.lng)
}

