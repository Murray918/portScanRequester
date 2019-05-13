const express = require('express')

const writeFile = require('./wrtie-to-file')
const scanPorts = require('./port-scan')

const timeout = 2000
const end = 10000
const start = 1
const host = 'localhost'
const PORT = 8080

let app = express()
//test writing to a file will end up writing a test for this later
// writeFile('./tmp/test.txt', 'woot woot woot party!!!!!!!!')
scanPorts(host, start, end, timeout)

app.get('/', (request, response) => {
  let host = request.hostname
  writeFile('./tmp/port-log.txt', request.hostname)
  response.send(host)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
