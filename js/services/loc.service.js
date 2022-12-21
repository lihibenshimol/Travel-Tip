import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'

const LOC_KEY = 'locsDB'

export const locService = {
    getLocs,
    getDate,
    addLoc,
    deleteLoc
}

const locs = [
    { name: 'Greatplace', id: 'akoic', lat: 32.047104, lng: 34.832384, createdAt: Date.now() },
    { name: 'Neveragain', id: 'n35mk', lat: 32.0553468, lng: 34.7883905, createdAt: Date.now() },
]

// const locs_new= [
//     { name: 'Greatplace', id: 'akoic', lat: 32.047104, lng: 34.832384, createdAt: Date.now() },
//     { name: 'Neveragain', id: 'n35mk', lat: 32.0553468, lng: 34.7883905, createdAt: Date.now() },
//     { name: 'Bla', id: 'n35mk', lat: 32.0553468, lng: 34.7883905, createdAt: Date.now() }
// ]


function getLocs() {
    //todo check if locs in local storage if not return loce
    return storageService.query(LOC_KEY)
        .then(locations => {
            console.log(locations);
            if (!locations || !locations.length) {
                console.log('locations = ', locations)
                // console.log('im working');
                // locs.forEach(location => {
                //     storageService.post(LOC_KEY, location)
                //     console.log('storagingg');
                // })

                storageService.post(LOC_KEY, locs)
            }
            console.log('now im ');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(locations[0])
            
                }, 2000)
            })
        })
}



function addLoc(name ,lat, lng) {
    locs.push({
        name,
        id: utilService.makeId(),
        lat,
        lng,
        createdAt: Date.now()
    })
    console.log('locs = ', locs)
    storageService.put(LOC_KEY, locs)
    return locs
}


function getDate(date) { //todo move to util
    const language = 'he-u-ca-english'
    const option = {
        hour: '2-digit',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
    }
    const formatedDate = new Intl.DateTimeFormat(language, option).format(date)
    return formatedDate
}

function deleteLoc(id){
    // console.log(id);
    return storageService.remove(LOC_KEY, id)
}