import "reflect-metadata"

import http from "http"
import app from "./app"
import { initDb } from "./data/db"

const PORT = 3000

const server = http.createServer(app)

server.listen(PORT, "localhost", async () => {
  await initDb()
  console.log("Server start listening on port: ", server.address())
})
