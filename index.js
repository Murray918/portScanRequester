const express = require('express')

//our modules that we have defined
const writeFile = require('./wrtie-to-file')
const { portScan } = require('./port-scan')

const timeout = 2000
const end = 10000
const start = 1
const host = 'localhost'
const PORT = 8080
// console.log('app js line 13', await scanPorts(host, start, end, timeout))

console.log('portScan Results : ', portScan(host, start, end, timeout))
// console.log('line 17', scannedPorts)

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
