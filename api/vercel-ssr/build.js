const fs = require('fs')

const build = async () => {
    let appExists = false
    while (!appExists) {
        console.log({

            'same': fs.readdirSync(__dirname),
            'parent': fs.readdirSync(__dirname + '/..'),
            'grandparent': fs.readdirSync(__dirname + '/../..')
        })
        console.log(`checking if ../../dist/build/main.js exists`)
        appExists = fs.existsSync('../../dist/build/main.js')
        await new Promise(r => setTimeout(r, 2000))
    }
    console.log(`../../dist/build/main.js exists exists`)
}
build()