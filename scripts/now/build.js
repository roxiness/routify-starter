const fs = require('fs-extra')
fs.removeSync('public')
fs.copySync('../../dist', 'public')