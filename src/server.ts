import http from "http"
import app from "./app"

const PORT = 3000

const server = http.createServer(app)

server.listen(PORT, "localhost", async () => {
  console.log("Server start listening on port: ", server.address())
})
