import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import mqttClient from './mqttClient'
require('dotenv').config()

import { createServer } from 'http'

// importamos las rutas
import setpointRoutes from "./routes/setpoint.routes";
import detectorRoutes from "./routes/detector.routes";


import { createRoles } from "./libs/initialSetup"

// IMPORT MODELS
import Data from './models/Data'

const app = express();

// config sockets
const server = createServer(app)
const io = require('socket.io')(server)

createRoles();
//createAdmin(); // para mejorar el codigo del weon de fazt

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000"
};
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Welcome Routes

// Routes
app.use("/api/setpoint", setpointRoutes)
app.use("/api/detector", detectorRoutes)


// MQTT
let USERS = {}
let parametros = []
let parametrosFiltered = []

io.on("connection", (socket) => {
  console.log(`${socket.id} was connected`)
  USERS[socket.id] = socket

  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`)
  })
})

mqttClient.receiveMessage()

setInterval(async () => {
  const paramSwitches = await Data.find({}).sort({_id:-1}).limit(100)
  const paramSwitchesFiltered = paramSwitches.filter((elem, index, self) => {
    return self.map(item => item.mac.toString()).indexOf(elem.mac.toString()) === index
  })
  // console.log(paramSwitchesFiltered)
  const paramSorted = paramSwitchesFiltered.sort((a,b) => {
    return a.topic.localeCompare(b.topic)
  })
  console.log(paramSorted)
  for (let i in USERS) {
    USERS[i].emit('datos', paramSorted)
  }
}, 5000)

server.listen(process.env.PORT, () => {
  console.log('server is ok')
})

export default app