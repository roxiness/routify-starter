const express = require('express')
const { ssr } = require('@sveltech/ssr')
const app = express()

const port = 5000
const distDir = '../../dist'
const bundleDir = `${distDir}/build/bundle.js`
const templateDir = `${distDir}/__app.html`

app.use(express.static(distDir))

app.get('*', async (req, res) => {
    const HTML = await ssr(templateDir, bundleDir, req.url)
    res.send(HTML)
})

app.listen(port)