import express from "express"

import path from "path"

const app = express()

const publicDirectory = express.static(path.resolve(__dirname))

app.use(publicDirectory)

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"))
})

app.listen(3005, () => { console.log("Serving at http://localhost:3005") })