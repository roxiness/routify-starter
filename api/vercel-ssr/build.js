const { resolve } = require('path')
const { existsSync, readdirSync, readFileSync } = require('fs')
const { execFileSync, execSync, spawnSync } = require('child_process')
const { rollup } = require('rollup')


const shouldBuild = process.env.NOW_GITHUB_DEPLOYMENT
const script = readFileSync(require.resolve('../../dist/build/main.js'), 'utf8')
const bundlePath = require.resolve('../../dist/build/bundle.js')

if (shouldBuild)
    build()
else
    waitForAppToExist()

inlineDynamicImports()


function build() {
    execSync('npm install && npm run now-build', { cwd: resolve('..', '..'), stdio: 'inherit' })
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

async function inlineDynamicImports() {
    const bundle = await rollup({
        input: script,
        inlineDynamicImports: true,
    })
    await bundle.write({ format: 'umd', file: bundlePath, name: 'roxi-ssr' })
}