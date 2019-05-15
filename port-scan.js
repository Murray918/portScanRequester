const net = require('net')
const writeFile = require('./wrtie-to-file')

const scanPort = async (host, port, timeout) => {
  let array = []
  ;(function(host, port, timeout) {
    let socket = new net.Socket()
    let portInfo

    socket.setTimeout(timeout, () => {
      socket.destroy()
    })

    socket.connect(port, host, () => {
      portInfo = `OPEN : ${port}`
      writeFile('./tmp/port-log.txt', `hostname : ${host}\n ${portInfo}`)
      array.push(portInfo)
      // we don't destroy the socket cos we want to listen to data event
      // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
    })

    // if any data is written to the client on connection, show it
    socket.on('data', data => {
      // console.log(portResults)
      socket.destroy()
    })

    socket.on('error', error => {
      // silently catch all errors - assume the port is closed
      socket.destroy()
    })
  })(host, port, timeout)
}
const portScan = (host, start, end, timeout) => {
  let portResults = []
  while (start <= end) {
    port = start
    scanPort(host, port, timeout)
    start++
  }
  return portResults
}

module.exports = { portScan }
