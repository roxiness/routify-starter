const fs = require('fs')
const { tossr } = require('tossr')

// const script = fs.readFileSync(require.resolve('../build/main.js'), 'utf8')
// const template = fs.readFileSync(require.resolve('../__app.html'), 'utf8')

module.exports = async (req, res) => {

    res.send(JSON.stringify({
        'same': fs.readdirSync(__dirname),
        'parent': fs.readdirSync(__dirname+'/..')
    }, null, 2))
    // const html = await tossr(template, script, req.url)
    // res.send(html + '\n<!--ssr rendered-->')
}

