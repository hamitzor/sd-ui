const express = require('express')
const path = require('path')
const { config } = require('./util/config-loader')

const app = express()

const publicJsDir = path.resolve(__dirname)
const publicDir = path.resolve(__dirname, '..', 'public')

app.use('/public/js', express.static(publicJsDir))
app.use('/public', express.static(publicDir))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

const { port } = config

app.listen(port, () => { console.log(`Serving at http://localhost:${port}`) })