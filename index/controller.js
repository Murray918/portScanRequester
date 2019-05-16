const { portScan } = require('../port-scan-config')
const { portScanConfig } = require('../port-scan-config')

const logPorts = (request, response) => {
  let { start, end, timeout } = portScanConfig
  console.log('hello there it was hit on port 3000')
  portScan(request.hostname, start, end, timeout)
  response.send('<h1>Warning your machine has been port scanned</h1>')
}

module.exports = logPorts
