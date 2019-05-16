const net = require('net')
const writeFile = require('./write-to-file')

const scanPort = async (host, port, timeout) => {
  ;(function(host, port, timeout) {
    let socket = new net.Socket()
    let portInfo

    socket.setTimeout(timeout, () => {
      socket.destroy()
    })

    socket.connect(port, host, () => {
      portInfo = `OPEN : ${port}`
      writeFile('./tmp/port-log.log', `hostname : ${host}\n ${portInfo}`)
      // we don't destroy the socket cos we want to listen to data event
      // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
    })

    // if any data is written to the client on connection, show it
    socket.on('data', data => {
      writeFile('./tmp/port-log.log', `hostname : ${host} \n DATA : ${data} `)
      console.log(`DATA : ${data}`)
      socket.destroy()
    })

    socket.on('error', error => {
      // silently catch all errors - assume the port is closed
      socket.destroy()
    })
  })(host, port, timeout)
}
const portScan = (host, start, end, timeout) => {
  while (start <= end) {
    port = start
    scanPort(host, port, timeout)
    start++
  }
  return true
}

module.exports = { portScan }
