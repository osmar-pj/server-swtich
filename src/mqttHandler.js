import mqtt from 'mqtt'
import Data from './models/Data'
require('dotenv').config()

class mqttHandler {
    constructor() {
      this.client = {}
      this.options = {
          clientId: process.env.MQTT_CLIENT_SRV,
          username: 'serverHomeOsmar',
          password: ''
      }
    }

    connect() {
      this.client = mqtt.connect(process.env.BASE_URL_MQTT, this.options)
      this.client.on('connect', () => {
        console.log('Client connected by SERVER:')
        // Subscribe
        this.client.subscribe(process.env.TOPIC_MQTT_DETECTOR, { qos: 0 })
      })
    }

    receiveMessage() {
      this.client.on('message', (topic, message) => {
        const data = JSON.parse(message.toString())
        data.topic = topic
        const newData = new Data(data)
        const dataSave = newData.save()
        return dataSave
        // if (parametros.length == 50) { parametros = [] }
        // parametrosFiltered = parametros.filter((elem, index, self) => {
        //   return self.map(item => item.nm.toString()).indexOf(elem.nm.toString()) === index
        // })
      })
    }

    sendMessage(topic, message) {
      this.client.publish(topic, message)
    }
}

export default mqttHandler