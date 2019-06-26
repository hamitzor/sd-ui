const express = require('express')
const path = require('path')
const config = require('../app.config')

const app = express()

const publicJsDir = path.resolve(__dirname)
const publicDir = path.resolve(__dirname, '..', 'public')

app.use('/public/js', express.static(publicJsDir))
app.use('/public', express.static(publicDir))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

const { domain, port } = config

app.listen(port, domain, () => { console.log(`Serving at http://${domain}:${port}`) })