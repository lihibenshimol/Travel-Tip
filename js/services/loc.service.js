import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'

const LOC_KEY = 'locsDB'

export const locService = {
    getLocs,
}


const locs = [
    { name: 'Greatplace', id: 1, lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', id: 2, lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    //todo check if locs in local storage if not return loce
    return storageService.query(LOC_KEY)
    


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}
