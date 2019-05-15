const express = require('express')
//our modules that we have defined
const { portScan } = require('./port-scan')

//initialize express
let app = express()

const portScanConfig = {
  start: 1,
  end: 2,
  timeout: 2000
}
// console.log('app js line 13', await scanPorts(host, start, end, timeout))

app.get('/', (request, response) => {
  let host = request.hostname
  console.log(host)
  portScan(host, start, end, timeout)
  response.send(host)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
