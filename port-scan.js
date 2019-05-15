const net = require('net')

const scanPort = async (host, port, timeout, array) => {
  ;(await function(host, port, timeout) {
    let socket = new net.Socket()
    let portInfo
    // let array = []

    socket.setTimeout(timeout, () => {
      socket.destroy()
    })

    socket.connect(port, host, () => {
      portInfo = `OPEN : ${port}`
      array.push(portInfo)
      console.log('socket callback : ', array)
      // console.log('OPEN: ' + port)
      // console.log('on connection', array)
      // we don't destroy the socket cos we want to listen to data event
      // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
    })

    // if any data is written to the client on connection, show it
    socket.on('data', data => {
      console.log(port + ': ' + data)
      // console.log(portResults)
      socket.destroy()
    })

    socket.on('error', error => {
      // silently catch all errors - assume the port is closed
      socket.destroy()
    })
  })(host, port, timeout)
  if (array[0] !== undefined) {
    console.log(array[0])
    return array
  }
}
const portScan = (host, start, end, timeout) => {
  let portResults = []
  while (start <= end) {
    port = start

    let item = scanPort(host, port, timeout, portResults)

    if (item !== undefined && typeof item === 'string') {
      // console.log(result)
      portResults.push(item)
    }
    start++
  }
  return portResults
}

module.exports = { portScan }
