const { execSync } = require('child_process')

if (!require('fs').existsSync('node_modules')) {
    execSync('npm install')
}

const fs = require('fs-extra')

if (!fs.pathExistsSync('../../dist')) {
    console.log('Building app...')
    execSync('npm run build:app', { stdio: 'inherit' })
}

fs.removeSync('public')
fs.copySync('../../dist', 'public')


