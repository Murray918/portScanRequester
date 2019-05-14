const net = require('net')

const scanPort = function(port, item, host) {
  let socket = new net.Socket()
  console.log('line 5')
  socket.setTimeout(2000, function() {
    socket.destroy()
  })

  socket.connect(port, 'localhost', function() {
    console.log('OPEN: ' + port)
    console.log('on connection', tempArr)
    item = `OPEN : ${port}`
  })

  socket.on('data', function(data) {
    item = `INFO : ${port} : ${data}`
    console.log(port + ': ' + data)
    console.log(portResults)
    socket.destroy()
  })

  socket.on('error', function(error) {
    socket.destroy()
  })
  console.log(item)
  return item
}

const scanPorts = (host, start, end, timeout) => {
  let range = start + end
  const portResults = Array(range).map((item, index) => {
    console.log('ksj;lkjfd', item)
    return scanPort(index, item)
  })
  return portResults
}

module.exports = scanPorts
