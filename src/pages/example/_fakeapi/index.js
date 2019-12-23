import { songs } from './songs'

const DELAY = 1000

export const fakeapi = async function (slug) {
    return new Promise(resolve => {
        const result = slug && songs.filter(s => s.slug === slug)[0] || songs
        setTimeout(()=>resolve(result), DELAY)
    })
}


