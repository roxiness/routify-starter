const { resolve } = require('path')
const {existsSync, readdirSync} = require('fs')
const { execFileSync, execSync, spawnSync } = require('child_process')


const shouldBuild = process.env.NOW_GITHUB_DEPLOYMENT


if (shouldBuild)
    build()
else
    waitForAppToExist()



function build() {
    execSync('npm run now-build', { cwd: resolve('..', '..') })
}


async function waitForAppToExist() {
    let appExists = false
    console.log(process.env)
    while (!appExists) {
        console.log({

            'same': readdirSync(__dirname),
            'parent': readdirSync(__dirname + '/..'),
            'grandparent': readdirSync(__dirname + '/../..')
        })
        console.log(`checking if ../../dist/build/main.js exists`)
        appExists = existsSync('../../dist/build/main.js')
        await new Promise(r => setTimeout(r, 2000))
    }
    console.log(`../../dist/build/main.js exists exists`)
}
