const fs = require('fs')
const { tossr } = require('tossr')

const script = fs.readFileSync(require.resolve('../public/build/bundle.js'), 'utf8')
const template = fs.readFileSync(require.resolve('../public/__app.html'), 'utf8')

module.exports = async (req, res) => {
    const html = await tossr(template, script, req.url)
    res.send(html + '\n<!--ssr rendered-->')
}

