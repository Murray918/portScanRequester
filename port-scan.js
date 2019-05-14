const net = require('net')

const scanPorts = (host, start, end, timeout) => {
  console.log('line 5')
  let portResults = []
  // the port scanning loop should run an iife
  while (start <= end) {
    // it is always good to give meaningful names to your variables
    // since the context is changing, we use `port` to refer to current port to scan
    let port = start

    // we create an anonynous function, pass the current port, and operate on it
    // the reason we encapsulate the socket creation process is because we want to preseve the value of `port` for the callbacks
    ;(function(port) {
      // console.log('CHECK: ' + port);
      let socket = new net.Socket()

      //destroy all
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
      // console.log(postResults)
    })(port)
    // console.log('line 44 : ', postResults)
    start++
  }
  // console.log('line 47 : ', postResults)
  return portResults
}
module.exports = scanPorts
