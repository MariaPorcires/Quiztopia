import { Position } from "./interfaces";

async function getPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
        if('geolocation' in navigator) {
            const geo = navigator.geolocation;
            geo.getCurrentPosition(pos => {
                const position: Position = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }
                resolve(position)
            }, error => {
                reject(error.message)
            })
        }  else {
            reject('Upgrade your browser')
        }
    })
}

export { getPosition }