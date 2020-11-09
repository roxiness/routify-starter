const fs = require('fs')
const { tossr } = require('tossr')

const script = fs.readFileSync(require.resolve('../public/build/bundle.js'), 'utf8')
const template = fs.readFileSync(require.resolve('../public/__app.html'), 'utf8')

exports.handler = async (event, context) => {
    const body = await tossr(template, script, event.path)
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}