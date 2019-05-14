const express = require('express')

const writeFile = require('./wrtie-to-file')
const scanPorts = require('./port-scan')

const timeout = 2000
const end = 3235
const start = 3234
const host = 'localhost'
const PORT = 8080

console.log(scanPorts(host, start, end, timeout))

let app = express()
// app.get('/', (request, response) => {
//   let host = request.hostname
//   console.log('localhost hit', scanPorts(host, start, end, timeout))
//   //   .forEach(item => {
//   //     writeFile('./tmp/port-log.txt', item.toString())
//   //   })
//   response.send(host)
// })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
