const fs = require('fs')
const { resolve } = require('path')
const { tossr } = require('tossr')

const script = fs.readFileSync(require.resolve('../../dist/build/main.js'), 'utf8')
const template = fs.readFileSync(require.resolve('../../dist/__app.html'), 'utf8')
// const template = resolve('..', '..', '__app.html')
// const script = resolve('..', '../build/main.js')

module.exports = async (req, res) => {

    // res.send(JSON.stringify({
    //     'same': fs.readdirSync(__dirname),
    //     'parent': fs.readdirSync(__dirname+'/..'),
    //     'grandparent': fs.readdirSync(__dirname+'/../..')
    // }, null, 2))
    const html = await tossr(template, script, req.url)
    res.send(html + '\n<!--ssr rendered-->')
}

