const fs = require('fs')
const { tossr } = require('tossr')
const { script, template } = require('./bundle.json')

console.log('dir')
console.log(fs.readdirSync(__dirname))

exports.handler = async (event, context) => {
    // const body = await tossr(template, script, event.path, { inlineDynamicImports: true })
    // return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
    return { statusCode: 200, body: JSON.stringify({ template, script }) }
}