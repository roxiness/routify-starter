const fs = require('fs')
const { tossr } = require('tossr')
const { script, template } = require('./bundle.json')

exports.handler = async (event, context) => {
    const body = await tossr(template, script, event.path)
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}