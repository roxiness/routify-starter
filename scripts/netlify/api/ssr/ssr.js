const fs = require('fs')
const { ssr } = require('@sveltech/ssr')

const script = fs.readFileSync(require.resolve('../public/build/bundle.js'), 'utf8')
const template = fs.readFileSync(require.resolve('../public/__app.html'), 'utf8')

exports.handler = async (event, context) => {
    const body = await ssr(template, script, event.path)
    return { statusCode: 200, body }
}