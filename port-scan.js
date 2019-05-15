const net = require('net')

const scanPort = function(host, port, timeout) {
  let socket = new net.Socket()
  let item

  socket.setTimeout(timeout, function() {
    socket.destroy()
  })

  socket.connect(port, host, function() {
    portResults.push(`OPEN : ${port}`)
    console.log('OPEN: ' + port)
    console.log('on connection', portResults)
    // we don't destroy the socket cos we want to listen to data event
    // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
  })

  // if any data is written to the client on connection, show it
  socket.on('data', function(data) {
    portResults.push(`INFO : ${port} : ${data}`)
    console.log(port + ': ' + data)
    console.log(portResults)
    socket.destroy()
  })

  socket.on('error', function(error) {
    // silently catch all errors - assume the port is closed
    socket.destroy()
  })
  return item
}

const portScan = (host, start, end, timeout) => {
  let portResults = []
  while (start <= end) {
    scanPort(start, host, timeout)
    start++
  }
  return portResults
}

module.exports = { portScan }
// ;(function(port) {
//   // console.log('CHECK: ' + port);
//   let socket = new net.Socket()

//   //destroy all
// socket.setTimeout(timeout, function() {
//   socket.destroy()
// })

// socket.connect(port, host, function() {
//   portResults.push(`OPEN : ${port}`)
//   console.log('OPEN: ' + port)
//   console.log('on connection', portResults)
//   // we don't destroy the socket cos we want to listen to data event
//   // the socket will self-destruct in 2 secs cos of the timeout we set, so no worries
// })

// // if any data is written to the client on connection, show it
// socket.on('data', function(data) {
//   portResults.push(`INFO : ${port} : ${data}`)
//   console.log(port + ': ' + data)
//   console.log(portResults)
//   socket.destroy()
// })

// socket.on('error', function(error) {
//   // silently catch all errors - assume the port is closed
//   socket.destroy()
//  })
//   // console.log(postResults)
// })(port)
// // console.log('line 44 : ', postResults)
// start++
// }
