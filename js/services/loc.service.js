import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'

const LOC_KEY = 'locsDB'

export const locService = {
    getLocs,
    getDate,
}


const locs = [
    { name: 'Greatplace', id: 'akoic', lat: 32.047104, lng: 34.832384, createdAt: Date.now() },
    { name: 'Neveragain', id: 'n35mk', lat: 32.0553468, lng: 34.7883905, createdAt: Date.now() },
]


function getLocs() {
    //todo check if locs in local storage if not return loce
    return storageService.query(LOC_KEY)
    .then(locations => {
        if (!locations || !locations.length) {
                console.log('im working');
                // locs.forEach(location => {
                //     storageService.post(LOC_KEY, location)
                //     console.log('storagingg');
                // })
        
                storageService.post(LOC_KEY, locs)
                .then(console.log)
            }
            console.log('now im ');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(locs)
                }, 2000)
            })
        })
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