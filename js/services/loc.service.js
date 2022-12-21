export const locService = {
    getLocs,
    addLocation
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation() {
    locs.push(_createLocation)
}

function _createLocation(name, lat, lng) {
    return {
        id: makeId(),
        lat,
        lng,
        name,
        createdAt: Date.now()
    }
}
