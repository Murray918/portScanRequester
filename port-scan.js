const net = require('net')

const scanPort = function(host, port) {
  let socket = new net.Socket()
  let item

  socket.setTimeout(2000, function() {
    socket.destroy()
  })

  socket.connect(port, host, function() {
    console.log('OPEN: ' + port)
    console.log('on connection', port)
  })

  socket.on('data', function(data) {
    item = `INFO : ${port} : ${data}`
    console.log(port + ': ' + data)
    socket.destroy()
  })

  socket.on('error', function(error) {
    socket.destroy()
  })
  return item
}

const portScan = (host, start, end, timeout) => {
  let portResults = []
  while (start <= end) {
    portResults.push(scanPort(start, host))
    start++
  }
  return portResults
}

module.exports = { portScan }
