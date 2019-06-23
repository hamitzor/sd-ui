import "core-js/stable"
import "regenerator-runtime/runtime"

window.test = async () => {

  const videos = await (await fetch("http://localhost:3000/video/")).json()
  const startUrl = videos.payload[0]._links["start-object-detection"]
  const videoId = videos.payload[0]._id

  const statusWs = new WebSocket("ws://localhost:3000/object-detection/watch-status/" + videoId + "/")
  const progressWs = new WebSocket("ws://localhost:3000/object-detection/watch-progress/" + videoId + "/")

  statusWs.addEventListener("open", () => {
    statusWs.send("hey")
  })

  statusWs.addEventListener("message", e => {
    console.log(e.data)
  })

  progressWs.addEventListener("open", () => {
    progressWs.send("hey")
  })

  progressWs.addEventListener("message", e => {
    console.log(e.data)
  })

  setTimeout(async () => {
    const startRes = await (await fetch(startUrl)).json()
    console.log(startRes)
    setTimeout(async () => {
      const cancelUrl = startRes._links.cancel
      await (await fetch(cancelUrl)).json()
    }, 5000)
  }, 200)
}

window.test()