require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)

//Website Entry Point
const path = require('path')
app.use(express.static(path.join(__dirname, 'frontend/public')))

//Socket io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

//mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL)

const userHandlers = require('./handlers/userHandler.js')
const chatroomHandlers = require('./handlers/chatroomHandler.js')

let socketsConnected = 0
const onConnection = (socket) => {
  socketsConnected++
  console.log(`| Connect | ${socket.id} | ${socketsConnected} |`)

  userHandlers(io, socket)
  chatroomHandlers(io, socket)

  socket.on('disconnect', (reason) => {
    socketsConnected--
    console.log(`| Disconn | ${socket.id} | ${socketsConnected} | ${reason}`)
  })
}

io.on('connection', onConnection)

//----------Keep at end of file-----------//
server.listen(port, console.log(`Server Started: http://localhost:${port}`))
